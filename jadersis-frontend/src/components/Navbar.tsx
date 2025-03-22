import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { DollarSign, BarChart3, Wallet, Menu } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Overview", path: "/", icon: <BarChart3 /> },
    {
      name: "Staking Platforms",
      path: "/staking-platforms",
      icon: <DollarSign />,
    },
    { name: "Connect Wallet", path: "/connect-wallet", icon: <Wallet /> }, // Moved to the end
  ];

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={isScrolled ? 4 : 0}
      sx={{
        transition: "all 0.3s ease-in-out",
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(15px)",
        borderBottom: isScrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <IconButton edge="start" color="primary" sx={{ mr: 2 }}>
            <DollarSign />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USD Stake Hub
          </Typography>
        </Link>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color={location.pathname === link.path ? "primary" : "inherit"}
              startIcon={link.icon}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          sx={{ display: { md: "none" } }}
        >
          <Menu />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.name}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
