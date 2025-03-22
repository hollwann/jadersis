
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { PlatformList } from "@/components/StakingPlatforms/PlatformList";

export const StakingPlatforms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
    >
      <Box sx={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        padding: "0 1rem",
        textAlign: "center",
        mb: 6
      }}>
        <Box sx={{ maxWidth: "48rem", mx: "auto", mb: 6 }}>
          <Chip 
            label="Staking Platforms" 
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
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
            Explore Staking Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
            Discover and compare all available USD staking options across different platforms
          </Typography>
        </Box>

        <PlatformList />
      </Box>
    </motion.div>
  );
};
