import { Button as OButton, extendVariants } from '@nextui-org/react';

export const Button = extendVariants(OButton, {
  defaultVariants: {
    size: 'md',
    variant: 'shadow',
    color: 'default',
    radius: 'sm',
  },
});
