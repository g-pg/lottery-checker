export type Game = {
	id: number;
	name: string;
	link: string;
	color: string;
	rules: GameRules;
};

export type GameRules = {
	resultsFunction: string;
	numbersRange: number;
	winConditions: number[];
	maxBetLength: number;
	minBetLength: number;
};

export const gamesList: Game[] = [
	{
		id: 1,
		name: "Mega-sena",
		link: "megasena",
		color: "--cl-megasena",
		rules: {
			resultsFunction: "simple",
			numbersRange: 60,
			maxBetLength: 15,
			minBetLength: 6,
			winConditions: [4, 5, 6],
		},
	},
	// { id: 2, name: "+Milionária", link: "maismilionaria", color: "--cl-maismilionaria" },
	{
		id: 3,
		name: "Lotofácil",
		link: "lotofacil",
		color: "--cl-lotofacil",
		rules: {
			resultsFunction: "simple",
			numbersRange: 25,
			maxBetLength: 20,
			minBetLength: 15,
			winConditions: [11, 12, 13, 15, 15],
		},
	},
	{
		id: 4,
		name: "Quina",
		link: "quina",
		color: "--cl-quina",
		rules: {
			resultsFunction: "simple",
			numbersRange: 80,
			maxBetLength: 15,
			minBetLength: 5,
			winConditions: [2, 3, 4, 5],
		},
	},
	// { id: 5, name: "Lotomania", link: "lotomania", color: "--cl-lotomania" },
	// { id: 6, name: "Timemania", link: "timemania", color: "--cl-timemania" },
	// { id: 7, name: "Dupla sena", link: "duplasena", color: "--cl-duplasena" },
	// { id: 8, name: "Federal", link: "federal", color: "--cl-federal" },
	// { id: 9, name: "Loteca", link: "loteca", color: "--cl-loteca" },
	// { id: 10, name: "Dia de Sorte", link: "diadesorte", color: "--cl-diadesorte" },
	// { id: 11, name: "Super Sete", link: "supersete", color: "--clsupersete" },
];
