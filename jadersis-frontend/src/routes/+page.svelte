<script lang="ts">
	import { disconnectWallet, reownModal, walletData } from '$lib/reown.svelte';
	import { readContract } from '@wagmi/core';
	import { onMount } from 'svelte';

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

	// 	onMount(() => {
	// 		const result = await readContract(config, {
	//   abi,
	//   address: '0x6b175474e89094c44da98b954eedeac495271d0f',
	//   functionName: 'totalSupply',
	// })
	// 		console.log(result);
	// 	});
</script>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if walletData.isConnected}
	<p>Wallet Name:{walletData.name}</p>
	<p>Wallet Icon:{walletData.icon}</p>
	<p>Wallet Address:{walletData.address}</p>
	<p>Wallet Status:</p>
	<span style="color:green">Connected</span>
	<button
		onclick={async () => {
			console.log('universalAdapter', reownModal);
			disconnectWallet();
		}}
	>
		Wallet Disconnect
	</button>
{:else}
	<button onclick={() => reownModal.open()}> Wallet Connect </button>
{/if}
