import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Overview } from "@/components/Dashboard/Overview";

export const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: "7rem", paddingBottom: "4rem" }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>
        <Overview />
      </Box>
    </motion.div>
  );
};
