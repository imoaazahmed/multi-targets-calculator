import { validatePercentage } from "./validate-percentage";

test("identifies valid percentages", () => {
	const percentages = [30, 20, 50]; // Total 100%
	const result = validatePercentage(percentages);

	expect(result.totalPercentages).toBe(100);
	expect(result.isValid).toBe(true);
});

test("identifies invalid percentages exceeding 100%", () => {
	const percentages = [60, 50, 10]; // Total 120%
	const result = validatePercentage(percentages);

	expect(result.totalPercentages).toBeGreaterThan(100);
	expect(result.isValid).toBe(false);
});

test("handles empty array", () => {
	const percentages: number[] = [];
	const result = validatePercentage(percentages);

	expect(result.totalPercentages).toBe(0);
	expect(result.isValid).toBe(true); // An empty array may be considered valid
});

test("handles negative percentages", () => {
	const percentages = [-20, 50, 70]; // Sum is 100, but includes negative value
	const result = validatePercentage(percentages);

	expect(result.totalPercentages).toBe(100);
	// The validity depends on whether negative values are considered valid in your context
	expect(result.isValid).toBe(false);
});

test("identifies single value exceeding 100% as invalid", () => {
	const percentages = [150]; // Single value exceeding 100%
	const result = validatePercentage(percentages);

	expect(result.totalPercentages).toBeGreaterThan(100);
	expect(result.isValid).toBe(false);
});
