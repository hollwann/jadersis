import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

import { mainnet, arbitrum } from '@reown/appkit/networks';

// import { REOWN_PROJECT_ID } from '$env/static/private';
import { createAppKit } from '@reown/appkit';

const projectId = import.meta.env.VITE_PROJECT_ID!; //process.env.REOWN_PROJECT_ID || '';

const networks = [mainnet, arbitrum];

// 2. Set up Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
	projectId,
	networks
});

// 3. Configure the metadata
const metadata = {
	name: 'jadersis',
	description: 'jadersis',
	url: 'https://jadersis.xyz', // origin must match your domain & subdomain
	icons: ['https://assets.reown.com/reown-profile-pic.png']
};

export const reownModal = createAppKit({
	adapters: [wagmiAdapter],
	networks: [mainnet, arbitrum],
	metadata,
	projectId,
	features: {
		analytics: true
	}
});