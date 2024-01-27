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
    const revenue = numberOfCoins * sellingAtTarget * target.price;
    totalRevenue += revenue;

    // Calculate profit for each target
    const targetProfit = revenue - investedAmount * sellingAtTarget;

    targetDetails.push({
      sellingPercentage: target.sellingPercentage,
      price: target.price,
      revenue,
      profit: targetProfit,
    });
  }

  // Calculate profit
  const profit = totalRevenue - investedAmount;
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
