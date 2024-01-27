import { formatPrice } from '@/utils/format-price';
import { TrendArrow } from '@/components/trend-arrow';
import { HTMLProps, useMemo } from 'react';

interface ProfitLossResultProps extends HTMLProps<HTMLDivElement> {
  amount: number;
  currencyCode: string;
  bgTransparent?: boolean;
  percentage?: number;
  isLoss?: boolean;
}

export const ProfitLossResult = ({
  amount,
  currencyCode,
  percentage,
  isLoss,
  bgTransparent,
  className,
  ...rest
}: ProfitLossResultProps) => {
  const colors = useMemo(() => {
    if (bgTransparent) {
      return isLoss ? 'text-loss-500' : 'text-profit-500';
    }

    return isLoss ? 'text-loss-500 bg-loss-400' : 'text-profit-500 bg-profit-400';
  }, [isLoss]);

  return (
    <div
      className={`flex items-center gap-unit-xs text-md bg-opacity-[0.15] rounded-md p-unit-xs font-semibold ${colors} ${className}`}
      {...rest}>
      <p>{formatPrice(amount, currencyCode)}</p>
      {!!percentage && <p>({formatPrice(percentage)}%)</p>}
      <TrendArrow isDown={isLoss} />
    </div>
  );
};
