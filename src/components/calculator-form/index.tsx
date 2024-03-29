import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardHeader, Input } from '@/theme/components';
import { scrollToTop } from '@/utils/scroll-to-top';
import { PercentageSymbolIcon } from '@/components/calculator-form/components/percentage-symbol-icon';
import { CustomLabel } from '@/components/custom-label';
import { SuggestedPercentages } from '@/components/calculator-form/components/suggested-percentages';
import { useInvestmentResults } from '@/components/calculator-form/hooks/use-investment-results';
import toNumber from 'lodash/toNumber';
import { useBreakpoint } from '@/theme/hooks';
import { PriceSymbolIcon } from '@/components/calculator-form/components/price-symbol-icon';
import { TargetsButtonGroup } from './components/targets-button-group';
import { InvestmentResults } from '@/components/calculator-form/components/investment-results';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProfitLossResult } from '../profit-loss-result';
import { resetSmartAnalyzer } from '@/redux/smart-analyzer/reducer';

export type Target = {
  price: string;
  sellingPercentage: string;
};

export type FormInputs = {
  investedAmount: string;
  buyPrice: string;
  stopLossPrice: string;
  targets: Target[];
};

const defaultValues: FormInputs = {
  buyPrice: '',
  investedAmount: '',
  stopLossPrice: '',
  targets: [
    { price: '', sellingPercentage: '33.33' },
    { price: '', sellingPercentage: '33.33' },
    { price: '', sellingPercentage: '33.33' },
  ],
};

const schema = yup.object().shape({
  investedAmount: yup.string().required('Invested amount is required'),
  buyPrice: yup.string().required('Buy price is required'),
  stopLossPrice: yup.string().required('Stop-loss is required'),
  targets: yup
    .array()
    .of(
      yup.object().shape({
        price: yup.string().required('Target is required'),
        sellingPercentage: yup.string().required('Selling percentage is required'),
      }),
    )
    .required(),
});

export const CalculatorForm = () => {
  const { isMobile } = useBreakpoint();
  const { onResultsUpdate, onResultsReset } = useInvestmentResults();
  const { targetDetails } = useAppSelector((state) => state.investmentResults.data);
  const smartAnalyzer = useAppSelector((state) => state.smartAnalyzer);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const { fields: targets, update } = useFieldArray({
    control,
    name: 'targets',
  });

  useEffect(() => {
    if (smartAnalyzer.data.input) {
      reset({
        investedAmount: getValues('investedAmount'),
        buyPrice: smartAnalyzer.data.output.buyPrice[0],
        stopLossPrice: smartAnalyzer.data.output.stopLoss,
        targets: smartAnalyzer.data.output.targets.map((i) => {
          return {
            price: i,
            sellingPercentage: (100 / smartAnalyzer.data.output.targets.length).toFixed(2).toString(),
          };
        }),
      });
    }
  }, [smartAnalyzer]);

  const onSubmit = (data: FormInputs) => {
    try {
      onResultsUpdate({
        investedAmount: toNumber(data.investedAmount),
        buyPrice: toNumber(data.buyPrice),
        stopLossPrice: toNumber(data.stopLossPrice),
        targets: data.targets.map((t) => {
          return {
            price: toNumber(t.price),
            sellingPercentage: toNumber(t.sellingPercentage),
          };
        }),
      });

      scrollToTop();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const onReset = () => {
    reset(defaultValues);
    onResultsReset();
    dispatch(resetSmartAnalyzer());
  };

  const updateAmount = (index: number, newValue: string) => {
    update(index, {
      price: newValue,
      sellingPercentage: getValues(`targets.${index}.sellingPercentage`),
    });
  };

  const updateSellingPercentage = (index: number, newValue: string) => {
    update(index, { price: getValues(`targets.${index}.price`), sellingPercentage: newValue });
  };

  return (
    <div className='flex flex-col xs:gap-unit-md md:gap-unit-xl'>
      <InvestmentResults />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col xs:gap-unit-lg md:gap-unit-xl' noValidate>
        <div className='grid xs:grid-cols-1 md:grid-cols-3 xs:gap-unit-xs md:gap-unit-md'>
          <Card>
            <CardHeader className='font-bold'>Investments</CardHeader>
            <CardBody>
              {/* Invested Amount Input */}
              <Controller
                name='investedAmount'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    startContent={<PriceSymbolIcon />}
                    label={
                      <CustomLabel pastedValueType='number' onPaste={(val) => setValue('investedAmount', val)}>
                        Investment
                      </CustomLabel>
                    }
                    type='number'
                    placeholder='0'
                    onClear={() => resetField('investedAmount')}
                    errorMessage={errors.investedAmount?.message}
                    isClearable
                  />
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader className='font-bold'>Buy Price</CardHeader>
            <CardBody>
              {/* Buy Price Input */}
              <Controller
                name='buyPrice'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    startContent={<PriceSymbolIcon />}
                    label={
                      <CustomLabel pastedValueType='number' onPaste={(val) => setValue('buyPrice', val)}>
                        Buy Price
                      </CustomLabel>
                    }
                    type='number'
                    placeholder='0'
                    onClear={() => resetField('buyPrice')}
                    errorMessage={errors.buyPrice?.message}
                    isClearable
                  />
                )}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader className='font-bold'>STOP-LOSS Price</CardHeader>
            <CardBody>
              {/* Stop Loss Input */}
              <Controller
                name='stopLossPrice'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    startContent={<PriceSymbolIcon />}
                    label={
                      <CustomLabel pastedValueType='number' onPaste={(val) => setValue('stopLossPrice', val)}>
                        STOP-LOSS Price
                      </CustomLabel>
                    }
                    type='number'
                    placeholder='0'
                    onClear={() => resetField('stopLossPrice')}
                    errorMessage={errors.stopLossPrice?.message}
                    isClearable
                  />
                )}
              />
            </CardBody>
          </Card>
        </div>

        <div className='flex flex-col gap-unit-md'>
          <div>
            <TargetsButtonGroup setValue={setValue} currentTargetsLength={getValues('targets').length} />
          </div>

          <div className='grid xs:grid-cols-1 md:grid-cols-3 xs:gap-unit-xs md:gap-unit-md'>
            {targets.map((target, index) => (
              <Card key={target.id}>
                <CardHeader className='font-bold'>
                  <div className='flex items-center justify-between w-full gap-unit-md'>
                    Target {index + 1}
                    {!!targetDetails.length && (
                      <ProfitLossResult
                        amount={targetDetails?.[index]?.profit}
                        currencyCode={'USD'}
                        className='text-sm'
                        bgTransparent
                      />
                    )}
                  </div>
                </CardHeader>
                <CardBody className='grid grid-cols-2 gap-unit-md'>
                  {/* Target Input */}
                  <Controller
                    control={control}
                    name={`targets.${index}.price`}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        {...field}
                        startContent={<PriceSymbolIcon />}
                        label={
                          <CustomLabel pastedValueType='number' onPaste={(val) => updateAmount(index, val)}>
                            Amount
                          </CustomLabel>
                        }
                        type='number'
                        placeholder='0'
                        onClear={() => updateAmount(index, '')}
                        errorMessage={error?.message}
                        isClearable
                      />
                    )}
                  />

                  {/* Selling Percentage Input */}
                  <div className='flex flex-col gap-2 items-start'>
                    <Controller
                      name={`targets.${index}.sellingPercentage`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          {...field}
                          startContent={<PercentageSymbolIcon />}
                          label={<CustomLabel>{isMobile ? 'Selling %' : 'Selling % at this Target'}</CustomLabel>}
                          type='number'
                          placeholder='0'
                          onClear={() => updateSellingPercentage(index, '')}
                          errorMessage={error?.message}
                          isClearable
                        />
                      )}
                    />

                    <SuggestedPercentages onSuggestedValueClick={(val) => updateSellingPercentage(index, val)} />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <div className='grid xs:grid-cols-2 md:grid-cols-6 xs:gap-unit-xs md:gap-unit-md xs:mt-unit-sm md:mt-unit-md'>
          <Button color='danger' size='lg' className='md:col-start-5' onClick={onReset}>
            Reset
          </Button>

          <Button type='submit' color='primary' size='lg'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
