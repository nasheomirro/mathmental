<script lang="ts">
	import AudioMute from '$lib/icons/AudioMute.svelte';
	import AudioOn from '$lib/icons/AudioOn.svelte';
	import { getAudioManager } from './audio.svelte';

	const audioManager = getAudioManager();
	const isMute = $derived(audioManager.isMute);
</script>

<button onclick={() => audioManager.toggleAudio()} class="audio-button">
	{#if isMute}
		<AudioMute />
	{:else}
		<AudioOn />
	{/if}
</button>

<style lang="scss">
	@use '$styles' as s;

	.audio-button {
		width: s.$icon-width;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition: transform 200ms ease-in-out;

		&:hover {
			transform: scale(1.1);
		}
	}
</style>
