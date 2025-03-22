import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface ValueCardProps {
  title: string;
  value: string;
  subValue?: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  variant?: "default" | "large";
  className?: string;
}

export const ValueCard = ({
  title,
  value,
  subValue,
  change,
  trend = "neutral",
  icon = <TrendingUpIcon />,
  variant = "default",
}: ValueCardProps) => {
  const getTrendColor = () => {
    if (trend === "up") return "success.main";
    if (trend === "down") return "error.main";
    return "text.secondary";
  };

  const getTrendIcon = () => {
    if (trend === "up") return icon || <ArrowUpwardIcon fontSize="small" />;
    if (trend === "down") return icon || <ArrowDownwardIcon fontSize="small" />;
    return icon || <TrendingUpIcon fontSize="small" />;
  };

  const getChangeColor = () => {
    if (!change) return "text.secondary";
    return change > 0
      ? "success.main"
      : change < 0
      ? "error.main"
      : "text.secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      style={{ width: "100%" }}
    >
      <Card
        sx={{
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: `${getTrendColor()}`,
                color: "white",
                opacity: 0.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getTrendIcon()}
            </Box>
          </Box>
          <Box>
            <Typography
              variant={variant === "large" ? "h3" : "h4"}
              sx={{ fontWeight: 600 }}
            >
              {value}
            </Typography>
            {(subValue || change !== undefined) && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                {subValue && (
                  <Typography variant="body2" color="text.secondary">
                    {subValue}
                  </Typography>
                )}
                {change !== undefined && (
                  <Typography
                    variant="body2"
                    sx={{
                      ml: subValue ? 1 : 0,
                      fontWeight: 500,
                      color: getChangeColor(),
                    }}
                  >
                    {change > 0 ? "+" : ""}
                    {change}%
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
