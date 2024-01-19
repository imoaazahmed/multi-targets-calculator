import { extendVariants, Input as OInput } from '@nextui-org/react';

export const Input = extendVariants(OInput, {
  defaultVariants: {
    size: 'md',
    labelPlacement: 'inside',
    variant: 'bordered',
    color: 'secondary',
    radius: 'sm',
  },
});
