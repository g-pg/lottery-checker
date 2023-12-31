<script lang="ts">
	import BoardNumber from "./BoardNumber.svelte";

	export let userGame: UserGame;
	export let userGameId: number;
	export let removeGame: (gameId: number) => void;
	export let color: string = "";
</script>

<div class="user-game-row">
	<div class="id">
		<span>
			{userGame.id}
		</span>
	</div>
	<div class="user-game">
		{#each userGame.numbers as n}
			<BoardNumber value={n} status={"correct"} type="" {color} />
		{/each}
	</div>
	<button class="delete-btn" on:click={() => removeGame(userGameId)}>
		<iconify-icon icon="majesticons:close"></iconify-icon>
	</button>
</div>

<style>
	.user-game-row {
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.8rem;
		border-radius: 6px;
		gap: 0.5rem;
	}

	.id {
		font-size: var(--fs-l);
		width: 6%;
		padding-right: 0.5rem;
	}

	.user-game {
		width: 100%;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
		gap: 0.5rem;
	}

	.delete-btn {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		line-height: 0;
		font-size: 1.2rem;
		cursor: pointer;
	}

	.delete-btn:hover {
		color: red;
	}
</style>
