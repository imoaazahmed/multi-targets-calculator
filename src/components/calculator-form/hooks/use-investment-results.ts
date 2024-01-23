import { useReducer } from "react";
import { calculateTotalProfit } from "../utils/calculate-total-profit";

type Target = {
	price: number;
	sellingPercentage: number;
};

type OnResultsUpdateData = {
	investedAmount: number;
	buyPrice: number;
	stopLossPrice: number;
	targets: Target[];
};

type Profit = {
	amount: number;
	totalExitAmount: number;
	percentage: number;
	currencyCode: string;
};

type StopLoss = {
	amount: number;
	totalExitAmount: number;
	percentage: number;
	currencyCode: string;
};

type ReducerState = {
	profit: Profit;
	stopLoss: StopLoss;
};

type ReducerAction = { type: "UPDATE"; payload: ReducerState } | { type: "RESET" };

const initialState: ReducerState = {
	profit: {
		amount: 0,
		totalExitAmount: 0,
		percentage: 0,
		currencyCode: "USD",
	},
	stopLoss: {
		amount: 0,
		totalExitAmount: 0,
		percentage: 0,
		currencyCode: "USD",
	},
};

const reducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "UPDATE":
			return { ...state, ...action.payload };
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

const validatePercentage = (percentages: number[]) => {
	let totalPercentages = 0;
	let isValid = false;

	percentages.forEach((value) => totalPercentages + value);
	isValid = totalPercentages <= 100;

	return { totalPercentages, isValid };
};

interface UseInvestmentResultsReturn {
	state: ReducerState;
	onResultsUpdate: (data: OnResultsUpdateData) => void;
	onResultsReset: () => void;
}

export const useCalculatorForm = (): UseInvestmentResultsReturn => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onResultsUpdate = (data: OnResultsUpdateData) => {
		const { investedAmount, buyPrice, stopLossPrice, targets } = data;

		const { totalPercentages, isValid } = validatePercentage(targets?.map((t) => t?.sellingPercentage));

		if (!isValid) return alert(`Total selling percentages is ${totalPercentages}%, it should be less than or equal to 100%`);

		const profit = calculateTotalProfit(
			investedAmount,
			buyPrice,
			targets[0]?.price,
			targets[1]?.price,
			targets[2]?.price,
			targets[0]?.sellingPercentage,
			targets[1]?.sellingPercentage,
			targets[2]?.sellingPercentage
		);

		const numberOfCoins = investedAmount / buyPrice;
		const totalLossAmount = numberOfCoins * stopLossPrice;
		const stopLossAmount = investedAmount - totalLossAmount;

		dispatch({
			type: "UPDATE",
			payload: {
				profit: {
					amount: profit,
					totalExitAmount: profit + investedAmount,
					percentage: (profit / investedAmount) * 100,
					currencyCode: "USD",
				},
				stopLoss: {
					amount: stopLossAmount,
					totalExitAmount: totalLossAmount,
					percentage: (stopLossAmount / investedAmount) * 100,
					currencyCode: "USD",
				},
			},
		});
	};

	const onResultsReset = () => {
		dispatch({ type: "RESET" });
	};

	return {
		state,
		onResultsUpdate,
		onResultsReset,
	};
};
