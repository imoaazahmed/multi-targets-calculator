import { CalculatorInputs } from '@/components/calculator-form/types';

interface MultiTargetsCalculatorInputs extends CalculatorInputs {}

interface TargetDetails {
  sellingPercentage: number;
  price: number;
  revenue: number;
  profit: number;
}

interface MultiTargetsCalculatorOutput {
  numberOfCoins: number;
  profit: number;
  profitPercentage: number;
  totalRevenue: number;
  isLoss: boolean;
  stopLoss: number;
  stopLossPercentage: number;
  totalStopLossRevenue: number;
  targetDetails: TargetDetails[];
}

export function multiTargetsCalculator({
  investedAmount,
  buyPrice,
  stopLossPrice,
  targets,
}: MultiTargetsCalculatorInputs): MultiTargetsCalculatorOutput {
  // Determine the number of coins purchased
  const numberOfCoins = investedAmount / buyPrice;

  // Calculate the profit & total revenue for each target
  const targetDetails = [];

  // Calculate revenue from selling coins at each target
  let totalRevenue = 0;

  for (const target of targets) {
    const sellingAtTarget = target.sellingPercentage / 100;
    const revenueFromTarget = numberOfCoins * sellingAtTarget * target.price;

    // Calculate the part of invested amount allocated for this target
    const investedForTarget = investedAmount * sellingAtTarget;

    // Adjust total revenue calculation
    totalRevenue += revenueFromTarget;

    // Profit for this target
    const targetProfit = revenueFromTarget - investedForTarget;

    targetDetails.push({
      sellingPercentage: target.sellingPercentage,
      price: target.price,
      revenue: revenueFromTarget,
      profit: targetProfit,
    });
  }

  // Calculate profit
  const profit = targetDetails.reduce((acc, target) => acc + target.profit, 0);
  const profitPercentage = (profit / investedAmount) * 100;
  const isLoss = profit + investedAmount < investedAmount;

  // Calculate stop-loss
  const totalStopLossRevenue = numberOfCoins * stopLossPrice;
  const stopLoss = investedAmount - totalStopLossRevenue;
  const stopLossPercentage = (stopLoss / investedAmount) * 100;

  return {
    numberOfCoins,
    profit,
    profitPercentage,
    totalRevenue,
    isLoss,
    stopLoss,
    stopLossPercentage,
    totalStopLossRevenue,
    targetDetails,
  };
}
