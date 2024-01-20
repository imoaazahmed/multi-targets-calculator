export function convertPercentageToNumber(percentage: number): number {
	// if (typeof percentage === "string") {
	// 	// Remove the '%' sign and convert the remaining string to a number
	// 	const number = parseFloat(percentage.replace("%", ""));

	// 	// Convert the percentage to a decimal
	// 	return number / 100;
	// }

	return percentage / 100;
}
