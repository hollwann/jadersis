import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        px: 4,
      }}
    >
      <Box textAlign="center" maxWidth={400}>
        <Box position="relative" mb={4}>
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: "9rem",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.1)",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
            }}
          >
            Page Not Found
          </Typography>
        </Box>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          component={Link}
          to="/"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};
