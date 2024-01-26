import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
	data: {
		input: string;
		output: {
			buyPrice: string[];
			stopLoss: string;
			targets: string[];
		};
	};
};

const initialState: SliceState = {
	data: {
		input: "",
		output: {
			buyPrice: [],
			stopLoss: "",
			targets: [],
		},
	},
};

const smartAnalyzerSlice = createSlice({
	name: "smartAnalyzer",
	initialState,
	reducers: {
		updateSmartAnalyzer(state, action: PayloadAction<SliceState["data"]>) {
			state.data = action.payload;
		},
		resetSmartAnalyzer(state) {
			state.data = initialState.data;
		},
	},
});

export const { updateSmartAnalyzer, resetSmartAnalyzer } = smartAnalyzerSlice.actions;
export default smartAnalyzerSlice.reducer;
