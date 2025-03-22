import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Chip, 
  Button, 
  Divider,
  Link as MuiLink
} from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export interface PlatformCardProps {
  id: number;
  name: string;
  logo: string;
  description: string;
  apy: number;
  tvl: string;
  risk: "low" | "medium" | "high";
  chains: string[];
  minimumDeposit: string;
  website: string;
}

export const PlatformCard = ({
  name,
  logo,
  description,
  apy,
  tvl,
  risk,
  chains,
  minimumDeposit,
  website
}: PlatformCardProps) => {

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch(risk) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "error";
      default: return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent sx={{ p: 3, pb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                mr: 2,
                flexShrink: 0
              }}
            >
              <img 
                src={logo} 
                alt={`${name} logo`} 
                style={{ width: 36, height: 36, objectFit: 'contain' }} 
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">APY</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                {apy}%
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">TVL</Typography>
              <Typography variant="h6">
                {tvl}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Risk Level
            </Typography>
            <Chip 
              label={risk.charAt(0).toUpperCase() + risk.slice(1)} 
              color={getRiskColor(risk)} 
              size="small"
              sx={{ mr: 1 }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Supported Chains
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {chains.map((chain, index) => (
                <Chip 
                  key={index} 
                  label={chain} 
                  size="small" 
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Minimum Deposit
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {minimumDeposit}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Start Staking
            </Button>
            <Button 
              variant="outlined"
              color="primary"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              Visit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
