import { extendVariants, Tooltip as OTooltip } from '@nextui-org/react';

export const Tooltip = extendVariants(OTooltip, {
  defaultVariants: {
    delay: 0,
    closeDelay: 0,
  },
});
