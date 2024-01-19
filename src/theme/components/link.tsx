import { extendVariants, Link as OLink } from '@nextui-org/react';

export const Link = extendVariants(OLink, {
  defaultVariants: {
    color: 'primary',
  },
});
