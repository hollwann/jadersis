import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

import { mainnet, arbitrum } from '@reown/appkit/networks';

import { createAppKit } from '@reown/appkit';
import { readContract } from '@wagmi/core';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

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

type WalletData = {
	name?: string;
	icon?: string;
	address?: string;
	isConnected: boolean;
};

export const reownModal = createAppKit({
	adapters: [wagmiAdapter],
	networks: [mainnet],
	metadata,
	enableWalletConnect: true,
	debug: true,
	projectId,
	features: {
		analytics: true
	}
});

export const walletData = $state({
	isConnected: false
} as WalletData);

reownModal.subscribeWalletInfo((walletInfo) => {
	if (!walletInfo) return;
	walletData.name = walletInfo.name;
	walletData.icon = walletInfo.icon;
});

reownModal.subscribeAccount((account) => {
	if (!account) return;
	walletData.address = account.address;
	walletData.isConnected = account.isConnected;
	getSupply();
});

reownModal.subscribeNetwork((network) => {
	console.log('network', network);
});

reownModal.subscribeState((state) => {
	console.log('state', state);
});

export const disconnectWallet = async () => {
	reownModal.open();
};

export const abi = [
	{
		type: 'function',
		name: 'balanceOf',
		stateMutability: 'view',
		inputs: [{ name: 'account', type: 'address' }],
		outputs: [{ type: 'uint256' }]
	},
	{
		type: 'function',
		name: 'totalSupply',
		stateMutability: 'view',
		inputs: [],
		outputs: [{ name: 'supply', type: 'uint256' }]
	}
] as const;
const getSupply = async () => {
	const result = await readContract(wagmiAdapter.wagmiConfig, {
		abi,
		functionName: 'balanceOf',
		address: '0x6b175474e89094c44da98b954eedeac495271d0f', // :0x8b87DE415A17870720204e1a4513a8951F027074
		args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
		account: '0xd2135CfB216b74109775236E36d4b433F1DF507B'
	});
	console.log(result);
};
