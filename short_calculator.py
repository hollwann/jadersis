#!/usr/bin/env python3

"""
static_hedge_from_deposits.py

Compute a static BTC short for a Uniswap V3 BTC/USD position
given:
  - The position's price range [p_a, p_b]
  - The amounts of BTC and USD deposited at mint
  - The BTC price at deposit p_0
  - A distribution assumption for p in [p_a, p_b] ('log-uniform' or 'linear-uniform').

Example usage:
  $ python static_hedge_from_deposits.py 0.5 1.0 1.23 10.0 12345.0 log-uniform
  (In that example, p_a=0.5, p_b=1.0, p_0=1.23, but p_0>p_b doesn't make sense, 
   so this is just a placeholder demonstration.)

IMPORTANT:
  - p_a, p_b, and p_0 are in *USD per BTC*.
  - btc_deposit is in BTC.
  - usd_deposit is in USD.
"""

import sys
import math

def compute_liquidity_from_deposit(
    btc_deposit: float,
    usd_deposit: float,
    p_a: float,
    p_b: float,
    p_0: float
) -> float:
    """
    Infer Uniswap V3 liquidity L from the deposit amounts 
    and the price at deposit p_0, given the range [p_a, p_b].

    Returns L as a float.
    """

    # Basic checks
    if p_a <= 0 or p_b <= 0:
        raise ValueError("p_a and p_b must be positive.")
    if p_a >= p_b:
        raise ValueError("p_a must be < p_b.")
    if p_0 <= 0:
        raise ValueError("p_0 must be positive.")

    # Case B: p_0 <= p_a => fully in BTC
    if p_0 <= p_a:
        # amount0 = L * ((sqrt(p_b)-sqrt(p_a)) / (sqrt(p_b)*sqrt(p_a)))
        # Solve for L = ...
        if usd_deposit > 1e-12:
            raise ValueError("Detected p_0 <= p_a, but usd_deposit is nonzero.")
        numerator = btc_deposit * math.sqrt(p_b) * math.sqrt(p_a)
        denominator = math.sqrt(p_b) - math.sqrt(p_a)
        L = numerator / denominator
        return L

    # Case C: p_0 >= p_b => fully in USD
    if p_0 >= p_b:
        # amount1 = L*(sqrt(p_b)-sqrt(p_a))
        # L = ...
        if btc_deposit > 1e-12:
            raise ValueError("Detected p_0 >= p_b, but btc_deposit is nonzero.")
        L = usd_deposit / (math.sqrt(p_b) - math.sqrt(p_a))
        return L

    # Case A: p_a < p_0 < p_b => partial BTC & partial USD
    # Formula for L from the BTC side:
    #   btc_deposit = L * ((sqrt(p_b) - sqrt(p_0)) / (sqrt(p_b)*sqrt(p_0)))
    L_from_btc = (
        btc_deposit
        * (math.sqrt(p_b) * math.sqrt(p_0))
        / (math.sqrt(p_b) - math.sqrt(p_0))
    )

    # Formula for L from the USD side:
    #   usd_deposit = L * (sqrt(p_0) - sqrt(p_a))
    L_from_usd = 0.0
    diff_sqrt = math.sqrt(p_0) - math.sqrt(p_a)
    if abs(diff_sqrt) < 1e-12:
        # Edge case: p_0 extremely close to p_a
        L_from_usd = float("inf") if usd_deposit > 1e-12 else 0.0
    else:
        L_from_usd = usd_deposit / diff_sqrt

    # Check consistency: they should match
    if abs(L_from_btc - L_from_usd) > 1e-6 * max(1, L_from_btc, L_from_usd):
        # In practice, small numerical differences may occur,
        # so let's just average them or raise a warning.
        # We'll average them:
        # print("Warning: L from BTC & USD differ, averaging them.")
        L = 0.5 * (L_from_btc + L_from_usd)
    else:
        L = L_from_btc  # or L_from_usd
    
    return L


def calculate_static_short(L: float, p_a: float, p_b: float, distribution='log-uniform') -> float:
    """
    Given Uniswap V3 liquidity L and range [p_a, p_b],
    return the static short in BTC under either log-uniform or linear-uniform distribution.
    """
    if distribution not in ('log-uniform', 'linear-uniform'):
        raise ValueError("distribution must be 'log-uniform' or 'linear-uniform'")

    if distribution == 'log-uniform':
        # S^* = L * [  (2 / ln(p_b/p_a)) * (1/sqrt(p_a) - 1/sqrt(p_b))  -  1/sqrt(p_b) ]
        ln_ratio = math.log(p_b / p_a)
        term1 = 2.0 * (1.0 / math.sqrt(p_a) - 1.0 / math.sqrt(p_b)) / ln_ratio
        term2 = 1.0 / math.sqrt(p_b)
        short_position = L * (term1 - term2)

    else:
        # linear-uniform
        # S^* = L * [  2*(sqrt(p_b)-sqrt(p_a)) / (p_b - p_a)  -  1/sqrt(p_b) ]
        denom = (p_b - p_a)
        term1 = 2.0 * (math.sqrt(p_b) - math.sqrt(p_a)) / denom
        term2 = 1.0 / math.sqrt(p_b)
        short_position = L * (term1 - term2)

    return short_position


def main():
    """
    Usage:
      python static_hedge_from_deposits.py p_a p_b p_0 btc_deposit usd_deposit distribution

    Example:
      python static_hedge_from_deposits.py 20000 40000 30000 2.0 10000 log-uniform
    """
    if len(sys.argv) < 7:
        print("Usage:")
        print(f"  {sys.argv[0]} p_a p_b p_0 btc_deposit usd_deposit distribution")
        print()
        print("Example:")
        print(f"  python {sys.argv[0]} 20000 40000 30000 2.0 10000 log-uniform")
        sys.exit(1)

    p_a = float(sys.argv[1])
    p_b = float(sys.argv[2])
    p_0 = float(sys.argv[3])
    btc_dep = float(sys.argv[4])
    usd_dep = float(sys.argv[5])
    distribution = sys.argv[6]

    # 1. Compute L from the deposit info
    L = compute_liquidity_from_deposit(btc_dep, usd_dep, p_a, p_b, p_0)

    # 2. Compute the static short
    short_btc = calculate_static_short(L, p_a, p_b, distribution)

    print(f"Estimated liquidity (L): {L:.6f}")
    print(f"Static short position (BTC): {short_btc:.6f}")


if __name__ == "__main__":
    main()
