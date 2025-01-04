import numpy as np
import plotly.graph_objects as go

def uniswap_v3_position_value(p, p_a, p_b, L):
    """
    Compute the USD value of a Uniswap V3 position on BTC/USD at price p.
    """
    val_below = L * ((np.sqrt(p_b) - np.sqrt(p_a)) / (np.sqrt(p_b) * np.sqrt(p_a))) * p
    val_above = L * (np.sqrt(p_b) - np.sqrt(p_a))
    val_in_range = (L * ((np.sqrt(p_b) - np.sqrt(p)) / (np.sqrt(p_b) * np.sqrt(p))) * p
                    + L * (np.sqrt(p) - np.sqrt(p_a)))
    
    return np.where(p <= p_a,
                    val_below,
                    np.where(p >= p_b, val_above, val_in_range))

def uniswap_v3_deposit_amounts(p_0, p_a, p_b, L):
    """
    Compute how many BTC and USD get deposited into a Uniswap V3 position,
    if the deposit price is p_0 in the range (p_a, p_b).
    """
    if p_0 <= p_a:
        # Entirely BTC range
        x_0 = L * ((np.sqrt(p_b) - np.sqrt(p_a)) / (np.sqrt(p_b)*np.sqrt(p_a)))
        y_0 = 0.0
    elif p_0 >= p_b:
        # Entirely USD range
        x_0 = 0.0
        y_0 = L * (np.sqrt(p_b) - np.sqrt(p_a))
    else:
        # Mixed deposit
        x_0 = L * ((np.sqrt(p_b) - np.sqrt(p_0)) / (np.sqrt(p_b)*np.sqrt(p_0)))
        y_0 = L * (np.sqrt(p_0) - np.sqrt(p_a))
    return x_0, y_0

def main():
    # ---------------------------
    # 1. Parameters
    # ---------------------------
    p_a = 45_000
    p_b = 55_000
    L   = 100_000
    p_0 = 50_000   # Deposit price
    
    # How many BTC & USD we deposit at p_0
    x_0, y_0 = uniswap_v3_deposit_amounts(p_0, p_a, p_b, L)
    
    # Initial deposit in USD
    initial_deposit = x_0 * p_0 + y_0
    
    # ---------------------------
    # 2. Price array and % change
    # ---------------------------
    prices = np.linspace(10_000, 70_000, 500)
    # % change from p_0
    percent_change = (prices - p_0) / p_0 * 100
    
    # Also compute the vertical lines for p_a, p_b in % terms
    percent_a = (p_a - p_0) / p_0 * 100  # e.g. -25%
    percent_b = (p_b - p_0) / p_0 * 100  # e.g. +25%
    
    # ---------------------------
    # 3. Values (in USD)
    # ---------------------------
    values_uni = uniswap_v3_position_value(prices, p_a, p_b, L)
    values_hodl = x_0 * prices + y_0
    short_pnl = x_0 * (p_0 - prices)
    values_delta_neutral = values_uni + short_pnl
    
    # ---------------------------
    # 4. Convert each to % of initial deposit
    # ---------------------------
    # e.g. (value / initial_deposit - 1) * 100
    uni_pct = (values_uni / initial_deposit - 1) * 100
    hodl_pct = (values_hodl / initial_deposit - 1) * 100
    dn_pct   = (values_delta_neutral / initial_deposit - 1) * 100
    
    # ---------------------------
    # 5. Build an interactive Plotly figure
    # ---------------------------
    fig = go.Figure()
    
    # Uniswap V3 line
    fig.add_trace(go.Scatter(
        x=percent_change,
        y=uni_pct,
        mode='lines',
        name='Uniswap V3 (%)',
        line=dict(color='blue')
    ))
    
    # HODL line
    fig.add_trace(go.Scatter(
        x=percent_change,
        y=hodl_pct,
        mode='lines',
        name='HODL (%)',
        line=dict(color='gray', dash='dash')
    ))
    
    # Delta-neutral line
    fig.add_trace(go.Scatter(
        x=percent_change,
        y=dn_pct,
        mode='lines',
        name='Delta-Neutral (%)',
        line=dict(color='purple')
    ))
    
    # Add vertical lines for p_a, p_b in % terms using "shapes"
    # We also annotate them manually for clarity.
    all_y = np.concatenate([uni_pct, hodl_pct, dn_pct])
    y_min, y_max = all_y.min(), all_y.max()
    margin = 5  # extra space on top and bottom
    
    # p_a line
    fig.add_shape(type="line",
                  x0=percent_a, x1=percent_a,
                  y0=y_min - margin, y1=y_max + margin,
                  line=dict(color='orange', dash='dash'))
    # Annotate it
    fig.add_annotation(
        x=percent_a, y=y_max,
        text=f"p_a = ${p_a}",
        showarrow=True, arrowhead=2, ay=-40
    )
    
    # p_b line
    fig.add_shape(type="line",
                  x0=percent_b, x1=percent_b,
                  y0=y_min - margin, y1=y_max + margin,
                  line=dict(color='green', dash='dash'))
    # Annotate it
    fig.add_annotation(
        x=percent_b, y=y_max,
        text=f"p_b = ${p_b}",
        showarrow=True, arrowhead=2, ay=-40
    )
    
    # ---------------------------
    # 6. Layout
    # ---------------------------
    fig.update_layout(
        title="Uniswap V3 Position vs. BTC Price (X-axis = % Change from p₀)",
        xaxis_title="BTC Price Change from p₀ (%)",
        yaxis_title="Performance (% relative to initial deposit)",
        hovermode="x unified",
        template="plotly_white"
    )
    
    fig.show()

if __name__ == "__main__":
    main()
