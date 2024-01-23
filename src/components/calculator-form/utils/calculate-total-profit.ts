export function calculateTotalProfit(i: number, c: number, x: number, y: number, z: number, _x: number, _y: number, _z: number): number {
	// Determine the number of coins purchased
	const numberOfCoins = i / c;

	// Selling percentages
	const sellingAtTarget1 = _x / 100;
	const sellingAtTarget2 = _y / 100;
	const sellingAtTarget3 = _z / 100;

	// Calculate revenue from selling coins at each target
	const revenueX = numberOfCoins * sellingAtTarget1 * x;
	const revenueY = numberOfCoins * sellingAtTarget2 * y;
	const revenueZ = numberOfCoins * sellingAtTarget3 * z;

	// Calculate total revenue
	const totalRevenue = revenueX + revenueY + revenueZ;

	// Calculate total profit
	const totalProfit = totalRevenue - i;

	return totalProfit;
}
