<script lang="ts">
	import { TentTree } from '@lucide/svelte';
</script>

<div class="flex items-center justify-center h-screen w-screen fixed z-2">
	<div class="flex flex-col gap-4 items-center p-4 backdrop-blur-xs">
		<h1 class="text-3xl font-bold mt-8">Form Submitted</h1>
		<p class="text-center">
			Thank you for taking the time, your response has been successfully
			submitted!<br />
			Expect an email with extra details shortly.
		</p>
		<p>You can close this tab now.</p>
	</div>
</div>

<div class="background">
	<div class="tile-1"></div>
	<div class="tile-2"></div>
	<div class="tile-3"></div>
	<div class="tile-4"></div>
</div>

<style>
	.background {
		animation: slide 64s linear infinite;
		height: 200vh;
		opacity: 0.03;
		position: fixed;
		transform: rotate(-15deg);
		width: 400vw;
	}

	.background div {
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.tile-1 {
		background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tent-tree-icon lucide-tent-tree"><circle cx="4" cy="4" r="2"/><path d="m14 5 3-3 3 3"/><path d="m14 10 3-3 3 3"/><path d="M17 14V2"/><path d="M17 14H7l-5 8h20Z"/><path d="M8 14v8"/><path d="m9 14 5 8"/></svg>');
	}

	.tile-2 {
		background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-icon lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>');
		left: 128px;
	}

	.tile-3 {
		background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-kindling-icon lucide-flame-kindling"><path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"/><path d="m5 22 14-4"/><path d="m5 18 14 4"/></svg>');
		left: 64px;
		top: 128px;
	}

	.tile-4 {
		background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>');
		left: 192px;
		top: 128px;
	}

	@keyframes slide {
		from {
			left: -200vw;
			top: -50vh;
		}

		to {
			left: calc(-200vw + 495px);
			top: calc(-50vh - 132px);
		}
	}
</style>
