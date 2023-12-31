<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import BoardNumber from "./BoardNumber.svelte";
	import PrimaryCard from "../misc/PrimaryCard.svelte";

	export let gameRange: number;
	export let selectedNumbers: number[] = [];
	export let color: string = "";

	// export let selectedNumbers: number[] = [];
	let board: BoardNumberType[] = Array.from({ length: gameRange }, (_, i) => {
		return { value: i + 1, status: "unselected" };
	});

	$: for (const n of selectedNumbers) {
		board[n - 1].status = "selected";
	}
</script>

<PrimaryCard color="var(--cl-main-900)">
	<div class="board">
		{#each board as { value, status }}
			<BoardNumber {value} {status} {color} on:numberSelected />
		{/each}
	</div>
</PrimaryCard>

<style>
	.board {
		display: grid;
		place-content: center;
		grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
		gap: 0.35rem;
		border-radius: 8px;
		padding: 0.5rem;
	}
</style>
