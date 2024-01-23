export type Target = {
	price: number;
	sellingPercentage: number;
};

export type CalculatorInputs = {
	investedAmount: number;
	buyPrice: number;
	stopLossPrice: number;
	targets: Target[];
};
