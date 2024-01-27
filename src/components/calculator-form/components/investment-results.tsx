import { ProfitLossResult } from '@/components/profit-loss-result';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardBody, CardHeader, Chip } from '@/theme/components';

export const InvestmentResults = () => {
  const { coinName } = useAppSelector((state) => state.smartAnalyzer.data);
  const { data } = useAppSelector((state) => state.investmentResults);
  const { profit, stopLoss } = data;

  return (
    <Card className='dark:bg-gradient-to-r from-blue-900 to-red-900 dark:border-0'>
      <CardHeader className='font-bold'>
        <div className='flex items-center gap-unit-xs'>
          <p>Investment Result</p>

          {!!coinName && (
            <Chip color='success' variant='dot'>
              {coinName}
            </Chip>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className='grid xs:grid-cols-2 md:grid-cols-4 xs:gap-3 md:gap-1'>
          <div className='flex flex-col gap-unit-xs items-start'>
            <p className='xs:text-xs md:text-sm'>Profit/Loss</p>

            <div className='flex gap-4 xs:text-sm md:text-md'>
              <ProfitLossResult
                amount={profit.amount}
                currencyCode={profit.currencyCode}
                percentage={profit.percentage}
                isLoss={profit.isLoss}
              />
            </div>
          </div>

          <div className='flex flex-col gap-unit-xs items-start'>
            <p className='xs:text-xs md:text-sm'>Total Exit Amount</p>

            <div className='flex gap-4 xs:text-sm md:text-md'>
              <ProfitLossResult
                amount={profit.totalExitAmount}
                currencyCode={profit.currencyCode}
                isLoss={profit.isLoss}
              />
            </div>
          </div>

          <div className='flex flex-col gap-unit-xs items-start'>
            <p className='xs:text-xs md:text-sm'>STOP-LOSS</p>

            <div className='flex gap-4 xs:text-sm md:text-md'>
              <ProfitLossResult
                amount={stopLoss.amount}
                currencyCode={stopLoss.currencyCode}
                percentage={stopLoss.percentage}
                isLoss={stopLoss.isLoss}
              />
            </div>
          </div>

          <div className='flex flex-col gap-unit-xs items-start'>
            <p className='xs:text-xs md:text-sm'>Total STOP-LOSS Amount</p>

            <div className='flex gap-4 xs:text-sm md:text-md'>
              <ProfitLossResult
                amount={stopLoss.totalExitAmount}
                currencyCode={stopLoss.currencyCode}
                isLoss={stopLoss.isLoss}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
