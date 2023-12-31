type BoardNumberType = {
	value: number;
	status: "unselected" | "selected" | "correct" | "incorrect" | "neutral";
};

type UserGame = {
	numbers: number[];
	id: number;
	status: "neutral" | "won" | "lose";
};
