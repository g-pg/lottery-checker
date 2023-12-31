<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let value: number;
	export let status: BoardNumberType["status"];
	export let type = "btn";
	export let size: "s" | "m" | "l" = "s";
	export let color: string = "";

	const dispatch = createEventDispatcher();
</script>

{#if type === "btn"}
	<button
		style={color ? `--color: var(${color})` : null}
		class="number {status} {size} "
		on:click={() => {
			dispatch("numberSelected", value);
		}}
	>
		{String(value).padStart(2, "0")}
	</button>
{:else}
	<span class="number correct" style={color ? `--color: var(${color})` : null}>
		{String(value).padStart(2, "0")}
	</span>
{/if}

<style>
	.number {
		width: 40px;
		height: 40px;
		display: grid;
		place-content: center;
		padding: 0.5rem;
		font-size: var(--fs-l);
		color: var(--cl-text);
		border-radius: 50vw;
		border: none;
		font-weight: 600;
		background: none;
	}

	button {
		cursor: pointer;
	}

	:not(.unselected) {
		color: white;
	}

	span {
		color: var(--cl-text);
	}

	.correct,
	.selected {
		background: var(--color);
	}

	.unselected:hover {
		color: white;
		background-color: hsl(from var(--color) h s l / 0.4);
	}
</style>
