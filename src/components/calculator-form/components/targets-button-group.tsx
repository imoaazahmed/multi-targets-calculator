import { Button } from '@/theme/components';
import { createArray } from '@/utils/create-array';
import { ButtonGroup, ButtonGroupProps } from '@nextui-org/react';
import { UseFormSetValue } from 'react-hook-form';
import { FormInputs } from '@/components/calculator-form';
import { useBreakpoint } from '@/theme/hooks';

interface TargetsButtonGroupProps extends ButtonGroupProps {
  setValue: UseFormSetValue<FormInputs>;
  currentTargetsLength: number;
}

export const TargetsButtonGroup = ({ setValue, currentTargetsLength, ...rest }: TargetsButtonGroupProps) => {
  const { isMobile } = useBreakpoint();

  const onClick = (targetsLength: number) => {
    setValue(
      'targets',
      createArray(targetsLength).map(() => {
        return { price: '', sellingPercentage: (100 / targetsLength).toFixed(0).toString() };
      }),
    );
  };

  return (
    <ButtonGroup fullWidth={isMobile} {...rest}>
      {[1, 2, 3].map((i) => (
        <Button key={i} size='md' color={currentTargetsLength === i ? 'primary' : 'default'} onClick={() => onClick(i)}>
          {i} Target{i > 1 ? 's' : ''}
        </Button>
      ))}
    </ButtonGroup>
  );
};
