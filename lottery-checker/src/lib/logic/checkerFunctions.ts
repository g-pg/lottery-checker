import { gamesList, type GameRules, type Game } from "../data/gamesList";

export type officialResult = number[] | number[][];
export type WinnerBets =
	| {
			id: number;
			bet: number[];
			points: number;
	  }[]
	| {}[];

const checkerFunctions = {
	alph: "ABCDEFGHIJKLMNOPQRSTUVXWYZ",

	simple: function (
		rules: GameRules,
		userGames: UserGame[],
		officialResult: officialResult
	): WinnerBets {
		const resultSet = new Set(officialResult.map(Number) as number[]);

		const winnerBets: WinnerBets = [];

		userGames.forEach((userGame, i) => {
			let points = 0;
			const numbers = userGame.numbers;
			for (const n of numbers) {
				if (resultSet.has(n)) points++;
			}

			if (rules.winConditions.includes(points)) {
				winnerBets.push({
					id: userGame.id,
					bet: numbers,
					points: points,
				});
			}
		});

		console.log(winnerBets);
		return winnerBets;
	},
};

export function getGameResults(
	game: Game,
	userGames: UserGame[],
	officialResult: officialResult
): WinnerBets {
	if (game.rules.resultsFunction === "simple") {
		return checkerFunctions.simple(game.rules, userGames, officialResult);
	}

	return [];
}
