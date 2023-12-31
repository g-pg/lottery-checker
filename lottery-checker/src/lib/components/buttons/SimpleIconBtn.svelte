<script lang="ts">
	export let title = "";
</script>

<button on:click class="btn">
	<slot />
</button>

<style>
	.btn {
		color: var(--cl-text);
		background: none;
		font-size: 1.5rem;
		line-height: 0;
		margin: 0;
		padding: 0.3rem;
		border: none;
		cursor: pointer;
	}

	.btn:hover {
		scale: 1.05;
	}

	.btn:active {
		scale: 0.95;
	}
</style>
