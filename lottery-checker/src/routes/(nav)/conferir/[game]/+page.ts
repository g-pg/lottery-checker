import { gamesList, type Game } from "$lib/data/gamesList.js";

export async function load({ params, url, fetch }) {
	const raffle = url.searchParams.get("concurso");

	const game: Game = gamesList.find((g) => g.link === params.game)!;

	async function getOfficialResults() {
		console.log("rodou");
		const url = `https://loteriascaixa-api.herokuapp.com/api/${game.link}/${
			raffle || "latest"
		}`;

		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error("Oops! Algo deu errado :(");
			}

			const data = await res.json();
			// const data = {
			// 	loteria: "megasena",
			// 	concurso: 2669,
			// 	data: "16/12/2023",
			// 	local: "ESPAÇO DA SORTE em SÃO PAULO, SP",
			// 	dezenasOrdemSorteio: ["07", "04", "35", "16", "46", "54"],
			// 	dezenas: ["04", "07", "16", "35", "46", "54"],
			// 	trevos: [],
			// 	timeCoracao: "",
			// 	mesSorte: "",
			// 	premiacoes: [
			// 		{
			// 			descricao: "6 acertos",
			// 			faixa: 1,
			// 			ganhadores: 0,
			// 			valorPremio: 0,
			// 		},
			// 		{
			// 			descricao: "5 acertos",
			// 			faixa: 2,
			// 			ganhadores: 64,
			// 			valorPremio: 36773.28,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 		{
			// 			descricao: "4 acertos",
			// 			faixa: 3,
			// 			ganhadores: 3317,
			// 			valorPremio: 1013.6,
			// 		},
			// 	],
			// 	estadosPremiados: [],
			// 	observacao: "",
			// 	acumulou: true,
			// 	proximoConcurso: 2670,
			// 	dataProximoConcurso: "31/12/2023",
			// 	localGanhadores: [],
			// 	valorArrecadado: 40819870,
			// 	valorAcumuladoConcurso_0_5: 132418255.11,
			// 	valorAcumuladoConcursoEspecial: 132418255.11,
			// 	valorAcumuladoProximoConcurso: 132418255.11,
			// 	valorEstimadoProximoConcurso: 550000000,
			// };
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	let officialResults: any = await getOfficialResults();

	return { game, officialResults };
}
