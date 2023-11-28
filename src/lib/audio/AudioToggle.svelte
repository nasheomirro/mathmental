<script lang="ts">
	import AudioMute from '$lib/icons/AudioMute.svelte';
	import AudioOn from '$lib/icons/AudioOn.svelte';
	import { getAudioManager } from './index.svelte';
  
  const audioManager = getAudioManager();
  const isMute = $derived(audioManager.isMute);
  $effect(() => console.log(audioManager.isMute))
</script>

<button onclick={() => audioManager.toggleAudio()} class="audio-icon">
	{#if isMute}
		<AudioMute />
	{:else}
		<AudioOn />
	{/if}
</button>

<style lang="scss">
	.audio-icon {
		width: 3rem;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition: transform 200ms ease-in-out;

		&:hover {
			transform: scale(1.1);
		}
	}
</style>
