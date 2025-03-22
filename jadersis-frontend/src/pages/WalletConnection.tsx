import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { ConnectWallet } from "@/components/Wallet/ConnectWallet";

export const WalletConnection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1rem",
          textAlign: "center",
          mb: 5,
        }}
      >
        <Box sx={{ maxWidth: "48rem", mx: "auto", mb: 5 }}>
          <Chip
            label="Wallet Connection"
            variant="outlined"
            sx={{
              mb: 2,
              px: 1.5,
              py: 0.5,
              bgcolor: "primary.light",
              opacity: 0.1,
              color: "primary.contrastText",
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Connect Your Wallet
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.125rem" }}
          >
            Connect your crypto wallet to start staking and earning rewards on
            your USD stablecoins
          </Typography>
        </Box>

        <ConnectWallet />
      </Box>
    </motion.div>
  );
};
