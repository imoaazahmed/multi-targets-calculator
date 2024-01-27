import { useCallback } from 'react';
import { multiTargetsCalculator } from '@/components/calculator-form/utils/multi-targets-calculator';
import { CalculatorInputs } from '@/components/calculator-form/types';
import { validatePercentage } from '@/components/calculator-form/utils/validate-percentage';
import { useAppDispatch } from '@/redux/hooks';
import { resetInvestmentResults, updateInvestmentResults } from '@/redux/investment-results/reducer';

interface UseInvestmentResultsReturn {
  onResultsUpdate: (data: CalculatorInputs) => void;
  onResultsReset: () => void;
}

export const useInvestmentResults = (): UseInvestmentResultsReturn => {
  const dispatch = useAppDispatch();

  const onResultsUpdate = useCallback((data: CalculatorInputs) => {
    const { investedAmount, buyPrice, stopLossPrice, targets } = data;
    const { totalPercentages, isValid } = validatePercentage(targets?.map((t) => t?.sellingPercentage));

    if (!isValid)
      return alert(`Total selling percentages is ${totalPercentages}%, it should be less than or equal to 100%`);

    const {
      profit,
      profitPercentage,
      totalRevenue,
      isLoss,
      stopLoss,
      stopLossPercentage,
      totalStopLossRevenue,
      targetDetails,
    } = multiTargetsCalculator({
      investedAmount,
      buyPrice,
      stopLossPrice,
      targets,
    });

    dispatch(
      updateInvestmentResults({
        profit: {
          amount: profit,
          totalExitAmount: totalRevenue,
          percentage: profitPercentage,
          currencyCode: 'USD',
          isLoss: isLoss,
        },
        stopLoss: {
          amount: stopLoss,
          totalExitAmount: totalStopLossRevenue,
          percentage: stopLossPercentage,
          currencyCode: 'USD',
          isLoss: true,
        },
        targetDetails,
      }),
    );
  }, []);

  const onResultsReset = useCallback(() => {
    dispatch(resetInvestmentResults());
  }, []);

  return {
    onResultsUpdate,
    onResultsReset,
  };
};
