import { multiTargetsCalculator } from "./multi-targets-calculator";

test("calculates correct values for standard input", () => {
	const input = {
		investedAmount: 500,
		buyPrice: 2.973,
		stopLossPrice: 2.755,
		targets: [
			{ sellingPercentage: 33, price: 3.103 },
			{ sellingPercentage: 33, price: 3.251 },
			{ sellingPercentage: 33, price: 3.496 },
		],
	};

	const expectedOutput = {
		numberOfCoins: 168.18028927009755,
		profit: 46.670030272452095,
		profitPercentage: 9.33400605449042,
		totalRevenue: 546.6700302724521,
		isLoss: false,
		stopLoss: 36.663303060881276,
		stopLossPercentage: 7.332660612176254,
		totalStopLossRevenue: 463.3366969391187,
	};

	const output = multiTargetsCalculator(input);

	expect(output).toEqual(expectedOutput);
});

test("correctly identifies a loss scenario", () => {
	const input = {
		investedAmount: 1000,
		buyPrice: 10,
		stopLossPrice: 9,
		targets: [{ sellingPercentage: 100, price: 8 }],
	};

	const output = multiTargetsCalculator(input);

	expect(output.isLoss).toBe(true);
	expect(output.profit).toBeLessThan(0);
});

test("handles case with no targets", () => {
	const input = {
		investedAmount: 1000,
		buyPrice: 10,
		stopLossPrice: 8,
		targets: [],
	};

	const output = multiTargetsCalculator(input);

	expect(output.totalRevenue).toBe(0);
	expect(output.profit).toBe(-1000); // Since no revenue is generated
});

test("handles zero invested amount", () => {
	const input = {
		investedAmount: 0,
		buyPrice: 10,
		stopLossPrice: 8,
		targets: [
			{ sellingPercentage: 50, price: 12 },
			{ sellingPercentage: 50, price: 14 },
		],
	};

	const output = multiTargetsCalculator(input);

	expect(output.numberOfCoins).toBe(0);
	expect(output.profit).toBe(0);
});
