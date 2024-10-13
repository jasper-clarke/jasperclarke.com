<script>
	import { animate } from '$lib/animate';
	let modal = false;
	let option = 'once';
	export let classes = '';

	const continueToCheckout = () => {
		if (option === 'once') {
			window.location.replace('https://donate.stripe.com/5kA17ccsXb7L1u8fZ0');
		} else if (option === 'weekly') {
			window.location.replace('https://buy.stripe.com/dR65nsboT0t75Ko6op');
		} else {
			window.location.replace('https://buy.stripe.com/bIY4jo3Wr7Vz4Gk5kk');
		}
	};
</script>

<button
	class="rounded-xl bg-zinc-900 sm:px-3 p-2 border border-zinc-800 text-md sm:text-xl font-serif {classes} z-30"
	use:animate={{ type: 'from', duration: 1, y: -200, z: 0, ease: 'expo.inOut' }}
	on:click={() => (modal = !modal)}>Coffee?</button
>

{#if modal}
	<div
		class="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-75 z-50 font-serif"
		style="will-change: transform;"
	>
		<div
			class="bg-black rounded-lg p-6 w-[90vw] lg:w-[50vw] shadow-lg relative"
			use:animate={{ type: 'from', duration: 1, opacity: 0, y: -1000, ease: 'back.out' }}
		>
			<!-- Close button -->
			<button
				class="absolute top-4 right-6 text-gray-500 text-4xl"
				on:click={() => (modal = false)}
			>
				&times;
			</button>

			<!-- Modal Title -->
			<h2 class="text-3xl mb-2">Buy Jasper A Coffee</h2>
			<hr class="mb-4 rounded-xl" />

			<div class="flex flex-row items-center gap-2 sm:gap-4">
				<button
					class="rounded-xl bg-zinc-900 border text-xl font-sans p-1 sm:p-2 border-zinc-800 transition ease-in-out duration-200 hover:scale-105 {option ===
					'once'
						? 'bg-zinc-100 text-black'
						: ''}"
					on:click={() => (option = 'once')}>Once</button
				>
				<button
					class="rounded-xl bg-zinc-900 border text-xl font-sans p-1 sm:p-2 border-zinc-800 transition ease-in-out duration-200 hover:scale-105 {option ===
					'weekly'
						? 'bg-zinc-100 text-black'
						: ''}"
					on:click={() => (option = 'weekly')}>Weekly</button
				>
				<button
					class="rounded-xl bg-zinc-900 border text-xl font-sans p-1 sm:p-2 border-zinc-800 transition ease-in-out duration-200 hover:scale-105 {option ===
					'monthly'
						? 'bg-zinc-100 text-black'
						: ''}"
					on:click={() => (option = 'monthly')}>Monthly</button
				>
			</div>

			<hr class="mt-4 mb-2 rounded-xl" />
			<div class="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between sm:items-center">
				<!-- <div class="rounded-xl bg-zinc-900 p-2"> -->
				<div>
					<p class="text-2xl">
						Total: $6<small>AUD</small>/coffee<br />
					</p>
					<small class="text-sm">Choose quantity at checkout</small>
				</div>
				<!-- </div> -->
				<button
					class="rounded-xl bg-zinc-900 p-2 border border-zinc-800 transition ease-in-out duration-200 hover:scale-105"
					on:click={continueToCheckout}
				>
					<p class="text-xl">Continue</p>
				</button>
			</div>
		</div>
	</div>
{/if}
