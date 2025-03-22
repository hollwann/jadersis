import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  Tabs,
  Tab,
  Badge,
  CircularProgress,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import {
  Wallet,
  ChevronRight,
  Check,
  AlertTriangle,
  Copy,
  ExternalLink,
} from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  popular?: boolean;
}

export const ConnectWallet = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [tabValue, setTabValue] = useState(0);

  const walletOptions: WalletOption[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      description: "Connect to your MetaMask wallet",
      popular: true,
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "https://seeklogo.com/images/C/coinbase-coin-logo-B5A0616FC8-seeklogo.com.png",
      description: "Connect to your Coinbase wallet",
      popular: true,
    },
    {
      id: "wallet-connect",
      name: "WalletConnect",
      icon: "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
      description: "Connect using WalletConnect",
    },
    {
      id: "ledger",
      name: "Ledger",
      icon: "https://cdn.worldvectorlogo.com/logos/ledger-logo.svg",
      description: "Connect to your Ledger hardware wallet",
    },
    {
      id: "trezor",
      name: "Trezor",
      icon: "https://cdn.worldvectorlogo.com/logos/trezor-1.svg",
      description: "Connect to your Trezor hardware wallet",
    },
  ];

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      if (Math.random() > 0.2) {
        // 80% chance of success
        setIsConnected(true);
        setWalletAddress("0x7F1a74D87Aa606E20b7d2BF32e6C376f7F1679F1");
      } else {
        setIsConnecting(false);
        setSelectedWallet(null);
      }
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedWallet(null);
    setWalletAddress("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "768px", mx: "auto" }}>
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader
                title="Connect Your Wallet"
                subheader="Choose a wallet to connect and start staking your assets"
              />
              <CardContent>
                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) => setTabValue(newValue)}
                  variant="fullWidth"
                >
                  <Tab label="All Wallets" />
                  <Tab label="Popular" />
                </Tabs>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {walletOptions
                    .filter(
                      (wallet) =>
                        tabValue === 0 || (tabValue === 1 && wallet.popular)
                    )
                    .map((wallet) => (
                      <motion.div
                        key={wallet.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            justifyContent: "space-between",
                            py: 2,
                            borderColor:
                              selectedWallet === wallet.id
                                ? "primary.main"
                                : undefined,
                            backgroundColor:
                              selectedWallet === wallet.id
                                ? "primary.light"
                                : undefined,
                          }}
                          onClick={() => handleConnect(wallet.id)}
                          disabled={isConnecting}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <img
                              src={wallet.icon}
                              alt={`${wallet.name} logo`}
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                              }}
                            />
                            <Box textAlign="left">
                              <Typography variant="body1" fontWeight="medium">
                                {wallet.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {wallet.description}
                              </Typography>
                            </Box>
                          </Stack>
                          {selectedWallet === wallet.id && isConnecting ? (
                            <CircularProgress size={20} />
                          ) : (
                            <ChevronRight />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                </Stack>
              </CardContent>
              <CardActions>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ width: "100%" }}
                >
                  By connecting your wallet, you agree to our{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                </Typography>
              </CardActions>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader
                title="Wallet Connected"
                subheader="Your wallet is now connected to USD Stake Hub"
                action={
                  <Badge
                    color="success"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Check />
                    Connected
                  </Badge>
                }
              />
              <CardContent>
                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 2,
                    backgroundColor: "action.hover",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Connected Wallet
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <img
                        src={
                          walletOptions.find((w) => w.id === selectedWallet)
                            ?.icon
                        }
                        alt="Wallet"
                        style={{ width: "16px", height: "16px" }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {
                          walletOptions.find((w) => w.id === selectedWallet)
                            ?.name
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="text.secondary">
                      Wallet Address
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        component="code"
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: "medium",
                          backgroundColor: "action.hover",
                          p: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        {shortenAddress(walletAddress)}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => copyToClipboard(walletAddress)}
                      >
                        <Copy />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    backgroundColor: "warning.light",
                    borderRadius: 1,
                    p: 2,
                    mt: 2,
                  }}
                >
                  <AlertTriangle />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Important Security Notice
                    </Typography>
                    <Typography variant="body2">
                      Never share your recovery phrase with anyone. USD Stake
                      Hub will never ask for your seed phrase or private keys.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={() =>
                    window.open(
                      "https://etherscan.io/address/" + walletAddress,
                      "_blank"
                    )
                  }
                >
                  View on Explorer
                  <ExternalLink />
                </Button>
                <Button variant="text" onClick={handleDisconnect}>
                  Disconnect Wallet
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
