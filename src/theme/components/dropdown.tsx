import {
  Dropdown as ODropdown,
  DropdownItem as ODropdownItem,
  DropdownMenu as ODropdownMenu,
  DropdownSection as ODropdownSection,
  DropdownTrigger as ODropdownTrigger,
  extendVariants,
} from '@nextui-org/react';

export const Dropdown = extendVariants(ODropdown, {
  defaultVariants: {},
});

export const DropdownTrigger = extendVariants(ODropdownTrigger, {
  defaultVariants: {},
});

export const DropdownMenu = extendVariants(ODropdownMenu, {
  defaultVariants: {},
});

export const DropdownSection = ODropdownSection;

export const DropdownItem = ODropdownItem;
