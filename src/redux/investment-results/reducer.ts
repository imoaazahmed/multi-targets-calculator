import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface TargetDetails {
  sellingPercentage: number;
  price: number;
  revenue: number;
  profit: number;
}

type SliceState = {
  data: {
    profit: Profit;
    stopLoss: StopLoss;
    targetDetails: TargetDetails[];
  };
};

const initialState: SliceState = {
  data: {
    profit: {
      amount: 0,
      totalExitAmount: 0,
      percentage: 0,
      currencyCode: 'USD',
      isLoss: false,
    },
    stopLoss: {
      amount: 0,
      totalExitAmount: 0,
      percentage: 0,
      currencyCode: 'USD',
      isLoss: true,
    },
    targetDetails: [],
  },
};

const investmentResultsSlice = createSlice({
  name: 'investmentResults',
  initialState,
  reducers: {
    updateInvestmentResults(state, action: PayloadAction<SliceState['data']>) {
      state.data = action.payload;
    },
    resetInvestmentResults(state) {
      state.data = initialState.data;
    },
  },
});

export const { updateInvestmentResults, resetInvestmentResults } = investmentResultsSlice.actions;
export default investmentResultsSlice.reducer;
