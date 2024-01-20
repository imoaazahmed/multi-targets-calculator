import { extendVariants, Textarea as OTextarea } from '@nextui-org/react';

export const Textarea = extendVariants(OTextarea, {
  defaultVariants: {
    size: 'md',
    labelPlacement: 'inside',
    variant: 'bordered',
    color: 'secondary',
  },
});
