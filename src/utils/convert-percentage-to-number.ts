export function convertPercentageToNumber(percentage: string): number {
	// Remove the '%' sign and convert the remaining string to a number
	const number = parseFloat(percentage.replace("%", ""));

	// Convert the percentage to a decimal
	return number / 100;
}
