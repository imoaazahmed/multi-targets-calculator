import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type SliceState = {
	investmentResults: {
		profit: Profit;
		stopLoss: StopLoss;
	};
};

const initialState: SliceState = {
	investmentResults: {
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
			isLoss: true,
		},
	},
};

const targetsCalculatorSlice = createSlice({
	name: "targetsCalculator",
	initialState,
	reducers: {
		updateInvestmentResults(state, action: PayloadAction<SliceState["investmentResults"]>) {
			state.investmentResults = action.payload;
		},
		resetInvestmentResults(state) {
			state.investmentResults = { ...initialState.investmentResults };
		},
	},
});

export const { updateInvestmentResults, resetInvestmentResults } = targetsCalculatorSlice.actions;
export default targetsCalculatorSlice.reducer;
