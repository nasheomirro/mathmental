<script lang="ts">
	type Props = {
		value: string;
		disabled?: boolean;
		oninput: (value: string) => void;
		onenter: (value: string) => void;
	};
	let { value, disabled, onenter, oninput: _oninput } = $props<Props>();

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onenter(value);
		}
	}

	function oninput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		_oninput(target.value);
	}
</script>

<input class="input" {disabled} bind:value {onkeydown} {oninput} />

<style lang="scss">
	@use '$styles' as s;

	.input {
		font-size: 1.2rem;
		text-align: center;
		border-radius: s.$radius;
		border: 1px solid s.$default-primary;
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
