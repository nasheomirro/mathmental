<script lang="ts">
	import AudioToggle from '$lib/misc/AudioToggle.svelte';
	import ThemeToggle from '$lib/misc/ThemeToggle.svelte';
	import { AudioManager, setAudioManager } from '$lib/misc/audio.svelte';
	import GameManager from '$lib/game/GameManager.svelte';
	import '$styles/init.scss';

	const audioManager = new AudioManager();
	setAudioManager(audioManager);
</script>

<nav class="nav">
	<span class="logo">DoTheMath</span>
	<div class="end">
		<ThemeToggle />
		<AudioToggle />
	</div>
</nav>

<GameManager />

<section class="container">
	<div class="separator-line" />
	<h1>What is this?</h1>
	<p>
		A game where you need to solve basic math questions that gets harder and harder until you answer
		one wrong or time runs out! My initial purpose is that my sister can't solve for shit, so I made
		this for her to practice quick math calculations and made it a little bit more entertaining by
		turning into a game.
	</p>
	<p>
		The source code for the game is public on my github. Not that its any good anyways, its barely
		hanging on by a string. <a href="https://github.com/nasheomirro/mathmental"
			>You can check it out here.</a
		>
	</p>
</section>

<style lang="scss">
	@use '$styles' as s;

	.nav {
		margin: 0 auto;
		max-width: 640px;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.logo {
			font-size: 1.25rem;
			font-weight: bold;
		}

		.end {
			display: flex;
			align-items: center;
		}
	}

	.container {
		max-width: 640px;
		padding: 0 1rem 3rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.separator-line {
		height: 1px;
		width: 100%;
		background-color: s.$default-surface;
		margin-bottom: 3rem;
	}
</style>
