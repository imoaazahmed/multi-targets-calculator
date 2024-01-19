import {
  extendVariants,
  Popover as OPopover,
  PopoverContent as OPopoverContent,
  PopoverTrigger as OPopoverTrigger,
} from '@nextui-org/react';

export const Popover = extendVariants(OPopover, {
  defaultVariants: {},
});

export const PopoverTrigger = extendVariants(OPopoverTrigger, {
  defaultVariants: {},
});

export const PopoverContent = extendVariants(OPopoverContent, {
  defaultVariants: {},
});
