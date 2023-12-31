import { gamesList, type GameRules, type Game } from "../data/gamesList";

export type Bets = number[][];
export type officialResult = number[] | number[][];
export type BetsWon =
	| {
			id: number;
			bet: number[];
			points: number;
	  }[]
	| {}[];

const checkerFunctions = {
	alph: "ABCDEFGHIJKLMNOPQRSTUVXWYZ",

	simple: function (rules: GameRules, bets: Bets, officialResult: officialResult): BetsWon {
		const resultSet = new Set(officialResult.map(Number) as number[]);

		const betsWon: BetsWon = [];
		bets.forEach((b, i) => {
			let points = 0;
			for (const n of b) {
				if (resultSet.has(n)) points++;
			}

			if (rules.winConditions.includes(points)) {
				betsWon.push({
					id: i,
					bet: b,
					points: points,
				});
			}
		});

		console.log(betsWon);
		return betsWon;
	},
};

export function getGameResults(game: Game, bets: Bets, officialResult: officialResult): BetsWon {
	if (game.rules.resultsFunction === "simple") {
		return checkerFunctions.simple(game.rules, bets, officialResult);
	}

	return [];
}
