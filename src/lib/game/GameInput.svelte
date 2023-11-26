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

<input {disabled} bind:value {onkeydown} {oninput} />
