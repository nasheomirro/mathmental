<script lang="ts">
	import { modes } from './config';
	import type { Mode } from './types';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	type Props = {
		mode: Mode;
		onmodechange: (newMode: Mode) => void;
	};

	let { mode, onmodechange } = $props<Props>();

	let modesList = Object.values(modes).sort((a, b) => b.duration - a.duration);
	let current = modesList.findIndex((item) => item.icon === mode.icon);

	function changeMode(direction: -1 | 1) {
		current += direction;
		if (modesList.length <= current) {
			current = 0;
		} else if (current < 0) {
			current = modesList.length - 1;
		}

		onmodechange(modesList[current]);
	}
</script>

<div class="container">
	<div class="image">
		<svelte:component this={mode.icon} />
	</div>
	<p class="explanation">{(mode.duration / 1000).toFixed(1)}s</p>
	<button class="btn btn--left" onclick={() => changeMode(-1)}>
		<ArrowLeft />
	</button>
	<button class="btn btn--right" onclick={() => changeMode(1)}>
		<ArrowRight />
	</button>
</div>

<style lang="scss">
	@use '$styles' as s;

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.image {
			width: 100%;
			max-width: 7rem;
		}

		.explanation {
			font-size: 1.5rem;
			font-weight: bold;
			margin: 0.5rem 0 0;
		}

		.btn {
			cursor: pointer;
			width: 3rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background-color: transparent;
			border: none;
		}

		.btn--left {
			left: 0.5rem;
		}

		.btn--right {
			right: 0.5rem;
		}
	}
</style>
