
import { Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { StakingPlatforms } from './pages/StakingPlatforms';
import { WalletConnection } from './pages/WalletConnection';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { Box } from '@mui/material';

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Box component="main">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/staking-platforms" element={<StakingPlatforms />} />
          <Route path="/connect-wallet" element={<WalletConnection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};
