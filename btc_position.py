#!/usr/bin/env python3
"""
plot_btc_holdings.py

A script to plot the BTC portion (token0) held in a Uniswap V3 position 
between price range [p_a, p_b] for BTC/USD.

Usage example:
  python plot_btc_holdings.py 100 20000 40000

This will display a chart of how many BTC are held as p varies from 1/2 p_a to 1.5 p_b.
"""

import sys
import math
import matplotlib.pyplot as plt

def amount0(p, p_a, p_b, L):
    """
    Returns the number of BTC (token0) held in a Uniswap V3 position
    given the current price p (USD per BTC).

    :param p:   float, current BTC price in USD
    :param p_a: float, lower price bound (USD per BTC)
    :param p_b: float, upper price bound (USD per BTC)
    :param L:   float, Uniswap V3 liquidity constant
    :return:    float, amount of BTC held
    """
    if p <= p_a:
        # Fully in BTC
        return L * ((math.sqrt(p_b) - math.sqrt(p_a)) / (math.sqrt(p_b) * math.sqrt(p_a)))
    elif p >= p_b:
        # Fully in USD
        return 0.0
    else:
        # Part BTC, part USD
        return L * ((math.sqrt(p_b) - math.sqrt(p)) / (math.sqrt(p_b) * math.sqrt(p)))


def main():
    # Parse command-line arguments
    if len(sys.argv) < 4:
        print(f"Usage: {sys.argv[0]} L p_a p_b")
        print(" e.g.: python plot_btc_holdings.py 100 20000 40000")
        sys.exit(1)

    L = float(sys.argv[1])
    p_a = float(sys.argv[2])
    p_b = float(sys.argv[3])

    if p_b <= p_a:
        raise ValueError("p_b must be greater than p_a.")
    if p_a <= 0:
        raise ValueError("p_a must be positive.")
    
    # Define the plot range
    p_min = 0.5 * p_a
    p_max = 1.5 * p_b
    n_points = 300  # how many points to sample in [p_min, p_max]

    prices = []
    btc_amounts = []

    # Generate a set of prices from p_min to p_max
    step = (p_max - p_min) / (n_points - 1)
    for i in range(n_points):
        p = p_min + i*step
        prices.append(p)
        btc_amounts.append(amount0(p, p_a, p_b, L))

    # Plot the results
    plt.figure(figsize=(8, 5))
    plt.plot(prices, btc_amounts, label='BTC holdings in the LP')
    plt.axvline(p_a, color='green', linestyle='--', label='p_a')
    plt.axvline(p_b, color='red', linestyle='--', label='p_b')
    plt.title(f"BTC Held in Uniswap V3 Position\nL={L}, p_a={p_a}, p_b={p_b}")
    plt.xlabel("BTC Price (USD per BTC)")
    plt.ylabel("BTC in the LP")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()
