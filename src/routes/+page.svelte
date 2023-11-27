<script lang="ts">
	import GameManager from '$lib/game/GameManager.svelte';
	import '$styles/init.scss';
</script>

<nav class="nav">
	<span class="logo">DoTheMath</span>
</nav>

<GameManager />

<section class="container">
	<h1>What is this?</h1>
	<p>
		A game where you need to solve basic math questions that gets harder and harder until you answer
		one wrong or time runs out! My initial purpose is that my sister can't solve for shit, so I made
		this for her to practice quick math calculations and made it a little bit more entertaining by
		turning into a game.
	</p>
	<p>
		The source code for the game is public on my github. Not that its any good anyways, its barely
		hanging on by a string. But you can check it out here.
	</p>
</section>

<style lang="scss">
	@use '$styles' as s;

	.nav {
		margin: 0 auto;
		max-width: 640px;
		padding: 1rem;
		display: flex;
		justify-content: space-between;

		.logo {
			font-size: 1.25rem;
			font-weight: bold;
		}
	}

	.container {
		max-width: 640px;
		padding: 0 1rem 5rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
