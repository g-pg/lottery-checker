<script>
	import { gamesList } from "$lib/data/gamesList";
	import GameBtn from "../buttons/GameBtn.svelte";
</script>

<div class="bar-wrapper">
	<div class="btns-wrapper container">
		{#each gamesList as { name, link, color }}
			<GameBtn content={name} {color} href={link} />
		{/each}
	</div>
</div>

<style>
	.bar-wrapper {
		background: var(--cl-main-900);
		padding: 1rem;
		border-radius: 8px;
	}

	.btns-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
		gap: 1rem;
	}
</style>
