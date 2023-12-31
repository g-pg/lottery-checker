import { gamesList, type GameRules, type Game } from "../data/gamesList";

export type Bets = number[][];
export type officialResult = number[] | number[][];
export type BetsWon =
	| {
			id: string;
			bet: number[];
			points: number;
	  }[]
	| {}[];

const checkerFunctions = {
	alph: "ABCDEFGHIJKLMNOPQRSTUVXWYZ",

	simple: function (rules: GameRules, bets: Bets, officialResult: officialResult) {
		const resultSet = new Set(officialResult as number[]);

		const betsWon: BetsWon = [{}];

		bets.forEach((b, i) => {
			let points = 0;
			for (const n of b) {
				if (resultSet.has(n)) points++;
			}

			if (rules.winConditions.includes(points)) {
				betsWon.push({
					id: this.alph[i],
					bet: b,
					points: points,
				});
			}
		});

		return betsWon;
	},
};

function getGameResults(game: Game, bets: Bets, officialResult: officialResult) {
	if (game.rules?.resultsFunction === "simple") {
		return checkerFunctions.simple(game.rules, bets, officialResult);
	}
}
