<script lang="ts">
	import BoardControls from "$lib/components/boards/BoardControls.svelte";
	import BoardNumber from "$lib/components/boards/BoardNumber.svelte";
	import SelectionBoard from "$lib/components/boards/SelectionBoard.svelte";
	import UserGameRow from "$lib/components/boards/UserGameRow.svelte";
	import toast from "svelte-french-toast";
	import SimpleIconBtn from "$lib/components/buttons/SimpleIconBtn.svelte";
	import PrimaryCard from "$lib/components/misc/PrimaryCard.svelte";
	import { getGameResults, type WinnerBets } from "$lib/logic/checkerFunctions.js";

	import playConfetti from "$lib/utils/playConfetti.js";
	import { goto } from "$app/navigation";

	export let data;
	$: ({ game, officialResults } = data);

	let userGames: UserGame[] = [];
	let selectedNumbers: number[] = [];

	function addNumber(e: CustomEvent) {
		if (selectedNumbers.length >= game.rules.maxBetLength) {
			toast.error(
				`A aposta máxima da ${game.name} é de ${game.rules.maxBetLength} números.`
			);

			return;
		}

		const selectedNumber = e.detail;

		if (selectedNumbers.includes(selectedNumber)) {
			selectedNumbers = selectedNumbers.filter((v) => v !== selectedNumber);
		} else {
			selectedNumbers = [...selectedNumbers, selectedNumber];
		}
	}

	function resetGame() {
		selectedNumbers = [];
	}

	function removeGame(id: number) {
		const newGames = [];

		let newId = 1;
		for (const g of userGames) {
			if (g.id === id) {
				id--;
				continue;
			}

			newGames.push({ ...g, id: newId });
			newId++;
		}

		userGames = newGames;
	}

	// check games logic
	let userResults: WinnerBets = [];
	let gamesChecked = false;

	function checkGames() {
		if (userGames.length < 1) {
			toast.error(`Adicione pelo menos um jogo.`);
			return;
		}

		const finalResult = getGameResults(data.game, userGames, officialResults?.dezenas);

		if (finalResult.length) {
			playConfetti();
		}
		userResults = finalResult;

		gamesChecked = true;

		goto("#results");
	}

	function resetGames() {
		userGames = [];
		userResults = [];
		gamesChecked = false;
	}

	function addGame(): boolean {
		if (selectedNumbers.length < game.rules.minBetLength) {
			toast.error(
				`A aposta mínima da ${game.name} é de ${game.rules.minBetLength} números.`
			);
			return false;
		}

		userGames = [
			...userGames,
			{
				numbers: selectedNumbers.sort(),
				id: userGames.length + 1,
				status: "neutral",
			},
		];

		selectedNumbers = [];

		return true;
	}

	//fetch
	let raffle: string = "";

	function handleSearchRaffle() {
		window.location.search = "?concurso=" + raffle;
	}
</script>

{#key game}
	<div class="container">
		<div class="search-raffle-wrapper">
			<p class="search-title">Buscar concurso</p>
			<div class="search-input-wrapper">
				<input
					bind:value={raffle}
					type="text"
					placeholder={officialResults?.concurso || "0000"}
					maxlength="4"
				/>

				<SimpleIconBtn on:click={handleSearchRaffle}>
					<iconify-icon icon="octicon:search-16"></iconify-icon>
				</SimpleIconBtn>
			</div>
		</div>
	</div>
	<div class="wrapper container">
		<div class="board">
			<div class="title-wrapper">
				<div class="item-title">
					<h2 style="color: var({game.color})">{game.name}</h2>
					<!-- <p>Escolha seus números, adicione-os à lista e veja o resultado!</p> -->
				</div>
			</div>
			<div class="board-wrapper">
				{#key selectedNumbers}
					<SelectionBoard
						gameRange={game.rules.numbersRange}
						{selectedNumbers}
						color={game.color}
						on:numberSelected={addNumber}
					/>
				{/key}
				<BoardControls
					{resetGame}
					{addGame}
					{checkGames}
					maxBetLength={game.rules.maxBetLength}
					gameRange={game.rules.numbersRange}
					bind:selectedNumbers
				/>
			</div>
		</div>

		<div class="user-games">
			<div class="title-wrapper">
				<div class="item-title">
					<h2>Seus jogos</h2>
					<div class="reset-icon-wrapper">
						<SimpleIconBtn on:click={resetGames}>
							<iconify-icon icon="carbon:reset"></iconify-icon>
						</SimpleIconBtn>
					</div>
				</div>
			</div>
			<PrimaryCard color="var(--cl-light-grey)" fill style="height: 100%">
				<div class="user-games-wrapper">
					{#if !userGames.length}
						<div class="no-user-games-wrapper">
							<p>Adicione seus jogos utilizando o quadro ao lado!</p>
						</div>
					{/if}
					{#each userGames as userGame}
						<UserGameRow
							{userGame}
							userGameId={userGame.id}
							{removeGame}
							color={game.color}
						/>
					{/each}
				</div>
				<!-- {/key} -->
			</PrimaryCard>
		</div>
		<div class="official-results">
			<div class="title-wrapper">
				<div class="item-title">
					<h2>Sorteio</h2>
				</div>
			</div>

			<PrimaryCard color="var(--cl-main-900)" style="height: 100%">
				{#await officialResults}
					<p>carregando</p>
				{:then result}
					<h3 class="raffle-title">
						Concurso {result.concurso} ({result.data})
					</h3>

					<div class="results-wrapper">
						{#each result.dezenas as n}
							<BoardNumber value={n} status={"correct"} color={game.color} />
						{/each}
					</div>
					<div class="prize-wrapper">
						<h4>Premiação</h4>
						<ul class="prize-ul">
							{#each result.premiacoes as { descricao, ganhadores, valorPremio }}
								<li class="prize-li">
									<p class="prize-desc">{descricao}</p>
									{#if ganhadores === 0}
										<p class="prize-winners">
											<strong>Nenhum ganhador</strong>.
										</p>
									{:else}
										<p>
											{ganhadores} ganhador{(ganhadores > 1 &&
												"es") ||
												""}.
											<br />
											Prêmio de
											<strong
												>R$
												{valorPremio.toLocaleString()}</strong
											>.
										</p>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{:catch error}
					<p>{error.message}</p>
				{/await}
			</PrimaryCard>
		</div>
		<div class="user-results" id="results">
			<h3>Resultado</h3>
			<PrimaryCard color="var(--cl-main-900)" style="min-height: 150px">
				<div class="user-results-wrapper">
					<p class="main-result-title">
						{#if !gamesChecked}
							Aguardando apostas!
						{:else if userResults.length === 0}
							Não foi dessa vez :(
						{:else}
							Parabéns! Você teve {userResults.length} aposta{userResults.length >
							1
								? "s"
								: ""} vencedora{userResults.length > 1 ? "s" : ""}!
						{/if}
					</p>
				</div>
			</PrimaryCard>
		</div>
	</div>
	<div class="" style="height: 300px; border: 1px solid red;"></div>
{/key}

<style>
	.wrapper {
		display: grid;

		grid-template-areas:
			"board user-games official-results"
			"user-results user-results user-results";
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(auto-fit, minmax(500px, 1fr));
		column-gap: 2rem;
		row-gap: 3rem;
		overflow: clip;
	}

	.wrapper > div {
		height: 100%;
		/* min-height: 450px; */
	}

	.board {
		grid-area: board;
		/* height: 460px; */
	}

	.user-games {
		grid-area: user-games;
		/* height: 460px; */
	}

	.official-results {
		grid-area: official-results;
		height: 100%;
	}

	.user-results {
		grid-area: user-results;
	}

	.search-raffle-wrapper {
		margin-block: 0.8rem;
		gap: 0.5rem;
		display: flex;
		align-items: center;
		width: max-content;
		margin-left: auto;
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
	}

	.search-input-wrapper input {
		max-width: 60px;
		border-radius: 5px;
		outline: none;
		border: 1px solid var(--cl-text);
		font-size: var(--fs-s);
		padding: 5px;
	}
	.item-title {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.title-wrapper {
		display: flex;
		flex-direction: column;
	}

	.reset-icon-wrapper {
		transition: all 0.5s ease;
		transform: rotate(0deg);
	}

	.reset-icon-wrapper:hover {
		transform: rotate(-90deg);
	}

	:global(.reset-icon-wrapper:hover button) {
		scale: none !important;
	}

	.item-title h2 {
		font-size: var(--fs-2xl);
	}

	.board-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	.user-games-wrapper {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		overflow-y: scroll;
	}

	.no-user-games-wrapper {
		width: 70%;
		position: absolute;
		left: 50%;
		bottom: 50%;
		transform: translate(-50%);
	}

	.no-user-games-wrapper p {
		font-weight: 700;
		opacity: 0.7;
		text-align: center;
		font-size: var(--fs-b);
	}

	.user-games-wrapper::-webkit-scrollbar {
		display: none;
	}

	.raffle-title {
		font-size: var(--fs-m);
	}

	.results-wrapper {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
		gap: 0.5rem;
	}
	.prize-wrapper h4 {
		margin-top: 2rem;
		font-size: var(--fs-l);
	}

	.prize-ul {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.prize-li p {
		line-height: 1.5;
	}
	.prize-desc {
		font-weight: 600;
	}

	.user-results h3 {
		font-size: var(--fs-l);
		margin-bottom: 1rem;
	}

	.user-results-wrapper {
		scroll-margin-top: 2rem;
		margin-bottom: auto;
	}

	.main-results-title {
	}
</style>
