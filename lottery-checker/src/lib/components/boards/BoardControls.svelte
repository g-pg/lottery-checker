<script lang="ts">
	import PrimaryBtn from "../buttons/PrimaryBtn.svelte";
	import toast from "svelte-french-toast";

	export let resetGame: () => void;
	export let addGame: () => boolean;
	export let checkGames: () => void;
	export let gameRange: number;
	export let maxBetLength: number;
	export let selectedNumbers: number[];

	let gameInput = "";

	const regex = new RegExp(`^(?:[0-9][0-9]?(?:\\s|$)){1,${maxBetLength}}$`);

	function handleInput(e: KeyboardEvent) {
		try {
			if (e.code === "Enter") {
				validateInput();
				handleAddGame();
				return;
			}

			if (e.code !== "Space") {
				return;
			}

			validateInput();
		} catch (error) {
			toast.error((error as any).message);
		}
	}

	function validateInput() {
		const input = gameInput.trim();
		if (!regex.test(input)) throw new Error("Formato inválido");

		let newNumbers: string[] | number[] = input.split(" ");

		newNumbers = newNumbers.map((v) => {
			const newV = Number(v);

			if (newV > gameRange) {
				// gameInput = input.replace(v, "");
				throw new Error(`Este jogo não inclui valores maiores que ${gameRange}.`);
			}

			if (newV === 0) {
				// gameInput = input.replace(v, "");
				throw new Error("O valor mínimo é 01.");
			}
			return newV;
		});

		const isNumberRepeated = new Set(newNumbers).size < newNumbers.length;
		if (isNumberRepeated) throw new Error("Cuidado para não repetir números!");
		selectedNumbers = newNumbers;
	}

	function handleResetGame() {
		resetGame();
		gameInput = "";
	}

	function handleAddGame() {
		if (addGame()) {
			gameInput = "";
		}
	}
</script>

<div class="wrapper">
	<input
		type="text"
		placeholder="Você também pode digitar, separando por espaço (01 02...)"
		bind:value={gameInput}
		on:keyup={handleInput}
	/>
	<div class="btns-wrapper">
		<PrimaryBtn content={"Adicionar"} color="var(--cl-main)" size={"m"} on:click={addGame} />
		<PrimaryBtn
			content={"Apagar"}
			color="var(--cl-duplasena)"
			size={"m"}
			on:click={handleResetGame}
		/>
		<PrimaryBtn
			content={"Verificar"}
			color="var(--cl-megasena)"
			size={"m"}
			on:click={checkGames}
		/>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}
	input {
		width: 100%;
		border: 1px solid var(--cl-light-grey);
		padding: 0.5rem 0.875rem;
		font-size: var(--fs-b);
	}

	input::placeholder {
		font-size: var(--fs-xs);
	}

	input:focus {
		outline: none;
	}

	.btns-wrapper {
		display: flex;
		align-items: center;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
		justify-content: space-between;
	}
</style>
