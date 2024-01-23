import { useCallback, useReducer } from "react";
import { multiTargetsCalculator } from "../utils/multi-targets-calculator";

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
	isLoss: boolean;
};

type StopLoss = {
	amount: number;
	totalExitAmount: number;
	percentage: number;
	currencyCode: string;
	isLoss: boolean;
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
		isLoss: false,
	},
	stopLoss: {
		amount: 0,
		totalExitAmount: 0,
		percentage: 0,
		currencyCode: "USD",
		isLoss: false,
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

type ValidatePercentageReturn = {
	totalPercentages: number;
	isValid: boolean;
};

const validatePercentage = (percentages: number[]): ValidatePercentageReturn => {
	const totalPercentages = percentages.reduce((total, value) => total + value, 0);
	const isValid = totalPercentages <= 100;
	return { totalPercentages, isValid };
};

interface UseInvestmentResultsReturn {
	state: ReducerState;
	onResultsUpdate: (data: OnResultsUpdateData) => void;
	onResultsReset: () => void;
}

export const useInvestmentResults = (): UseInvestmentResultsReturn => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onResultsUpdate = useCallback((data: OnResultsUpdateData) => {
		const { investedAmount, buyPrice, stopLossPrice, targets } = data;

		const { totalPercentages, isValid } = validatePercentage(targets?.map((t) => t?.sellingPercentage));

		if (!isValid) return alert(`Total selling percentages is ${totalPercentages}%, it should be less than or equal to 100%`);

		const { profit, profitPercentage, totalRevenue, isLoss, stopLoss, stopLossPercentage, totalStopLossRevenue } = multiTargetsCalculator({
			investedAmount,
			buyPrice,
			stopLossPrice,
			targets,
		});

		dispatch({
			type: "UPDATE",
			payload: {
				profit: {
					amount: profit,
					totalExitAmount: totalRevenue,
					percentage: profitPercentage,
					currencyCode: "USD",
					isLoss: isLoss,
				},
				stopLoss: {
					amount: stopLoss,
					totalExitAmount: totalStopLossRevenue,
					percentage: stopLossPercentage,
					currencyCode: "USD",
					isLoss: stopLoss !== 0 || totalStopLossRevenue !== 0,
				},
			},
		});
	}, []);

	const onResultsReset = useCallback(() => {
		dispatch({ type: "RESET" });
	}, []);

	return {
		state,
		onResultsUpdate,
		onResultsReset,
	};
};
