<script lang="ts">
	import { reownModal } from '$lib/reown';
	type WalletData = {
		name?: string;
		icon?: string;
		address?: string;
		isConnected: boolean;
	};
	let walletData = $state({
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
	});
	const disconnectWallet = () =>
		reownModal
			.disconnect()
			.then(() => {
				walletData.isConnected = false;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				console.log('disconnectWallet');
			});

	reownModal.subscribeNetwork((network) => {
		console.log('network', network);
	});

	reownModal.subscribeState((state) => {
		console.log('state', state);
	});

	$inspect(walletData);
</script>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if walletData.isConnected}
	<p>Wallet Name:{walletData.name}</p>
	<p>Wallet Icon:{walletData.icon}</p>
	<p>Wallet Address:{walletData.address}</p>
	<p>Wallet Status:</p>
	<span style="color:green">Connected</span>
	<button onclick={() => disconnectWallet()}> Wallet Disconnect </button>
{:else}
	<button onclick={() => reownModal.open()}> Wallet Connect </button>
{/if}
