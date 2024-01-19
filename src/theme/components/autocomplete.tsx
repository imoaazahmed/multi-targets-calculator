import {
  Autocomplete as OAutocomplete,
  AutocompleteItem as OAutocompleteItem,
  AutocompleteSection as OAutocompleteSection,
  extendVariants,
} from '@nextui-org/react';

export const Autocomplete = extendVariants(OAutocomplete, {
  defaultVariants: {
    size: 'md',
    labelPlacement: 'inside',
    variant: 'bordered',
    color: 'secondary',
    radius: 'sm',
  },
});

export const AutocompleteSection = extendVariants(OAutocompleteSection, {
  defaultVariants: {},
});

export const AutocompleteItem = extendVariants(OAutocompleteItem, {
  defaultVariants: {},
});
