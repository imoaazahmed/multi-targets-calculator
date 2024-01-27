import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/theme/components';
import { useDisclosure, cn } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@/theme/components';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { CustomLabel } from '@/components/custom-label';
import { useAppDispatch } from '@/redux/hooks';
import { updateSmartAnalyzer } from '@/redux/smart-analyzer/reducer';
import { analyzeText } from '@/components/smart-analyzer/utils/analyze-text';

export type FormInputs = {
  recommendation: string;
};

const defaultValues: FormInputs = {
  recommendation: '',
};

const schema = yup.object().shape({
  recommendation: yup.string().required('Recommendation is required'),
});

export const SmartAnalyzer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const onSubmit = (data: FormInputs) => {
    const { targets, stopLoss, buyPrice } = analyzeText(data.recommendation);

    dispatch(
      updateSmartAnalyzer({
        input: data.recommendation,
        output: {
          buyPrice,
          stopLoss,
          targets,
        },
      }),
    );

    _onClose();
  };

  const _onClose = () => {
    clearErrors();
    onClose();
  };

  return (
    <div>
      <div
        onClick={onOpen}
        className={cn(
          'w-8 h-8',
          'flex items-center justify-center',
          'rounded-lg bg-default-100 hover:bg-default-200',
          'cursor-pointer',
        )}>
        <FaWandMagicSparkles />
      </div>

      <Modal isOpen={isOpen} onClose={_onClose} size='lg' placement='center'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Smart Analyzer</ModalHeader>

          <ModalBody>
            <form id='recommendationForm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name='recommendation'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label={<CustomLabel onPaste={(val) => setValue('recommendation', val)}>Recommendation</CustomLabel>}
                    placeholder='Enter your recommendation'
                    onClear={() => resetField('recommendation')}
                    errorMessage={errors.recommendation?.message}
                  />
                )}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color='default' variant='light' onPress={onClose}>
              Close
            </Button>
            <Button color='primary' variant='shadow' type='submit' form='recommendationForm'>
              Analyze
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
