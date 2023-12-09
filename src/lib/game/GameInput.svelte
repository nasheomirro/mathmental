<script lang="ts">
	type Props = {
		value: string;
		disabled?: boolean;
		onenter: (value: string) => void;
	};

	let { value, disabled, onenter } = $props<Props>();
	let inputRef: HTMLInputElement;

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onenter(value);
		}
	}

	export function focus() {
		inputRef.focus();
	}
</script>

<input bind:this={inputRef} class="input" bind:value {onkeydown} {disabled} />

<style lang="scss">
	@use '$styles' as s;

	.input {
		font-size: 1.2rem;
		text-align: center;
		border-radius: s.$radius;
		border: 1px solid s.$default-primary;
		background-color: s.$body-background-color;
		padding: 0.25rem;

		&:focus {
			outline: 4px solid s.$soft-primary;
		}

		&:disabled {
			border-color: s.$default-surface;
			cursor: not-allowed;
		}
	}
</style>
