import { extendVariants, Select as OSelect, SelectItem as OSelectItem } from '@nextui-org/react';

export const SelectItem = OSelectItem;

export const Select = extendVariants(OSelect, {
  defaultVariants: {
    size: 'md',
    labelPlacement: 'inside',
    variant: 'bordered',
    color: 'secondary',
    radius: 'sm',
  },
});
