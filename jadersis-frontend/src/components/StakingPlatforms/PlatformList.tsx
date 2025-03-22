import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PlatformCard, type PlatformCardProps } from './PlatformCard';

export const PlatformList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [minApy, setMinApy] = useState<number>(0);

  // Platform data (mock data for now)
  const platforms: PlatformCardProps[] = [
    {
      id: 1,
      name: "Lido Finance",
      logo: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
      description: "Liquid staking solution for Ethereum and other PoS blockchains",
      apy: 3.8,
      tvl: "$15.2B",
      risk: "low",
      chains: ["Ethereum", "Solana", "Polygon"],
      minimumDeposit: "0.01 ETH",
      website: "https://lido.fi/"
    },
    {
      id: 2,
      name: "Aave",
      logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
      description: "Open-source liquidity protocol for earning interest and borrowing",
      apy: 2.5,
      tvl: "$5.7B",
      risk: "medium",
      chains: ["Ethereum", "Avalanche", "Polygon", "Optimism", "Arbitrum"],
      minimumDeposit: "No minimum",
      website: "https://aave.com/"
    },
    {
      id: 3,
      name: "Compound",
      logo: "https://cryptologos.cc/logos/compound-comp-logo.png",
      description: "Algorithmic money market protocol on Ethereum",
      apy: 2.1,
      tvl: "$2.3B",
      risk: "medium",
      chains: ["Ethereum"],
      minimumDeposit: "No minimum",
      website: "https://compound.finance/"
    },
    {
      id: 4,
      name: "Curve Finance",
      logo: "https://cryptologos.cc/logos/curve-dao-token-crv-logo.png",
      description: "Exchange liquidity pool designed for stablecoin trading",
      apy: 4.2,
      tvl: "$3.8B",
      risk: "medium",
      chains: ["Ethereum", "Polygon", "Avalanche", "Fantom"],
      minimumDeposit: "No minimum",
      website: "https://curve.fi/"
    },
    {
      id: 5,
      name: "Anchor Protocol",
      logo: "https://cryptologos.cc/logos/anchor-protocol-anc-logo.png",
      description: "Savings protocol offering low-volatile yields on Terra stablecoin deposits",
      apy: 19.5,
      tvl: "$8.5B",
      risk: "high",
      chains: ["Terra"],
      minimumDeposit: "No minimum",
      website: "https://www.anchorprotocol.com/"
    },
    {
      id: 6,
      name: "yearn.finance",
      logo: "https://cryptologos.cc/logos/yearn-finance-yfi-logo.png",
      description: "Yield aggregator that maximizes returns from lending protocols",
      apy: 5.1,
      tvl: "$1.2B",
      risk: "medium",
      chains: ["Ethereum", "Fantom"],
      minimumDeposit: "No minimum",
      website: "https://yearn.finance/"
    },
    {
      id: 7,
      name: "Convex Finance",
      logo: "https://cryptologos.cc/logos/convex-finance-cvx-logo.png",
      description: "Platform boosting rewards for Curve liquidity providers and stakers",
      apy: 12.3,
      tvl: "$4.7B",
      risk: "medium",
      chains: ["Ethereum"],
      minimumDeposit: "No minimum",
      website: "https://www.convexfinance.com/"
    },
    {
      id: 8,
      name: "Nexo",
      logo: "https://cryptologos.cc/logos/nexo-nexo-logo.png",
      description: "Centralized lending platform offering interest-bearing accounts",
      apy: 10.0,
      tvl: "$6.0B",
      risk: "high",
      chains: ["Multiple"],
      minimumDeposit: "$100",
      website: "https://nexo.io/"
    }
  ];

  // Filter platforms based on search query, risk, and minimum APY
  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          platform.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || platform.risk === riskFilter;
    const matchesApy = platform.apy >= minApy;
    
    return matchesSearch && matchesRisk && matchesApy;
  });

  // Get unique chains for filtering
  const allChains = [...new Set(platforms.flatMap(platform => platform.chains))];

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search platforms"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="risk-filter-label">Risk Level</InputLabel>
                <Select
                  labelId="risk-filter-label"
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  label="Risk Level"
                >
                  <MenuItem value="all">All Risks</MenuItem>
                  <MenuItem value="low">Low Risk</MenuItem>
                  <MenuItem value="medium">Medium Risk</MenuItem>
                  <MenuItem value="high">High Risk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" gutterBottom>
                Minimum APY: {minApy}%
              </Typography>
              <Slider
                value={minApy}
                onChange={(_, newValue) => setMinApy(newValue as number)}
                aria-labelledby="minimum-apy-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={20}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" gutterBottom>
              Popular Chains
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {allChains.map((chain) => (
                <Chip 
                  key={chain} 
                  label={chain} 
                  variant="outlined" 
                  onClick={() => setSearchQuery(chain)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
        
        {filteredPlatforms.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">No platforms match your criteria</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters to see more results
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPlatforms.map((platform) => (
              <Grid item xs={12} sm={6} md={4} key={platform.id}>
                <PlatformCard
                  id={platform.id}
                  name={platform.name}
                  logo={platform.logo}
                  description={platform.description}
                  apy={platform.apy}
                  tvl={platform.tvl}
                  risk={platform.risk}
                  chains={platform.chains}
                  minimumDeposit={platform.minimumDeposit}
                  website={platform.website}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
