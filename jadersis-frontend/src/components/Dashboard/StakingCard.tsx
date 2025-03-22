import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface StakingCardProps {
  title: string;
  logo?: string;
  description: string;
  apy: number;
  platformUrl?: string;
  className?: string;
}

export const StakingCard = ({
  title,
  logo,
  description,
  apy,
  platformUrl,
}: StakingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{ width: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3, pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            {logo && (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "grey.200",
                }}
              >
                <img
                  src={logo}
                  alt={`${title} logo`}
                  style={{ width: 32, height: 32, objectFit: "contain" }}
                  loading="lazy"
                />
              </Box>
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ my: 2, flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Annual Percentage Yield
            </Typography>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", mt: 0.5 }}
            >
              {apy}%
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ p: 3, pt: 0, display: "flex", gap: 1 }}>
          <Button
            component={Link}
            to="/staking-platforms"
            variant="outlined"
            sx={{ flexGrow: 1 }}
            endIcon={<ArrowRightAltIcon />}
          >
            Learn More
          </Button>
          {platformUrl && (
            <Button
              size="small"
              variant="text"
              onClick={() => window.open(platformUrl, "_blank")}
              sx={{ minWidth: "auto" }}
            >
              <OpenInNewIcon fontSize="small" />
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};
