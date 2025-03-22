import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Wallet } from "lucide-react";
import {
  Typography,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
} from "@mui/material";

const platformData = [
  {
    id: 1,
    title: "Lido Finance",
    logo: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
    description: "Liquid staking for Ethereum and other PoS chains",
    apy: 3.8,
    platformUrl: "https://lido.fi/",
  },
  {
    id: 2,
    title: "Aave",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
    description: "Decentralized liquidity protocol for borrowing and lending",
    apy: 2.5,
    platformUrl: "https://aave.com/",
  },
  {
    id: 3,
    title: "Compound",
    logo: "https://cryptologos.cc/logos/compound-comp-logo.png",
    description: "Algorithmic money market protocol on Ethereum",
    apy: 2.1,
    platformUrl: "https://compound.finance/",
  },
];

const StakingCard = ({ platform }) => (
  <Card sx={{ display: "flex", alignItems: "center", padding: 2, margin: 2 }}>
    <Box sx={{ marginRight: 2 }}>
      <img
        src={platform.logo}
        alt={platform.title}
        style={{ width: "50px", height: "50px", borderRadius: "8px" }}
      />
    </Box>
    <Box>
      <Typography variant="h6">{platform.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {platform.description}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        APY: {platform.apy}%
      </Typography>
      <a
        href={platform.platformUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2", textDecoration: "none" }}
      >
        Visit Platform
      </a>
    </Box>
  </Card>
);

export const Overview = () => {
  const [totalValue, setTotalValue] = useState("$0");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setTotalValue("$1,245,870");
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          maxWidth: "768px",
          margin: "16px auto 48px",
        }}
      >
        <Badge
          color="primary"
          badgeContent="Platform Overview"
          sx={{
            marginBottom: 2,
            paddingX: 1.5,
            paddingY: 0.5,
            minWidth: "auto", // Allow badge to shrink
            maxWidth: "100%", // Ensure badge fits content
            whiteSpace: "normal", // Allow text to wrap if needed
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          USD Staking Platform
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The most secure platform to stake your USD stablecoins and earn
          passive income
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          marginBottom: 3,
        }}
      >
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)" }}>
          <Card>
            <CardHeader title="Total Value Locked" />
            <CardContent>
              <Typography variant="h6">
                {isLoading ? "Loading..." : totalValue}
              </Typography>
              <Typography variant="body2">Across all platforms</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)" }}>
          <Card>
            <CardHeader title="Average APY" />
            <CardContent>
              <Typography variant="h6">
                {isLoading ? "Loading..." : "2.8%"}
              </Typography>
              <Typography variant="body2">Weighted average</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: "1 1 calc(33.333% - 16px)" }}>
          <Card>
            <CardHeader title="Connected Platforms" />
            <CardContent>
              <Typography variant="h6">
                {isLoading ? "Loading..." : "8"}
              </Typography>
              <Typography variant="body2">Active integrations</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ height: 600, width: "100%", marginBottom: 4 }}>
        <Typography
          variant="h2"
          sx={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: 2 }}
        >
          Staking Opportunities
        </Typography>
        <Box
          sx={{
            display: "flex", // Use flex layout
            flexDirection: "column", // Horizontal alignment
            gap: 3, // Spacing between cards
            padding: 3, // Inner padding
            backgroundColor: "#f9f9f9", // Light background for contrast
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            overflowX: "auto", // Enable horizontal scrolling if needed
            whiteSpace: "nowrap", // Prevent wrapping
          }}
        >
          {platformData.map((platform) => (
            <StakingCard key={platform.id} platform={platform} />
          ))}
        </Box>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background:
            "linear-gradient(to right, rgba(0, 123, 255, 0.2), rgba(0, 123, 255, 0.05))",
          borderRadius: "16px",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: 2 }}
        >
          Ready to start earning passive income?
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 3, maxWidth: "512px", marginX: "auto" }}
        >
          Connect your wallet now to explore all available staking opportunities
          and start earning interest on your stablecoins.
        </Typography>
        <Link to="/connect-wallet" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<Wallet style={{ width: "16px", height: "16px" }} />}
          >
            Connect Wallet
          </Button>
        </Link>
      </motion.div>
    </Box>
  );
};
