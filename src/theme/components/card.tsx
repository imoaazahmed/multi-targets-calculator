import {
  Card as OCard,
  CardBody as OCardBody,
  CardFooter as OCardFooter,
  CardHeader as OCardHeader,
  extendVariants,
} from '@nextui-org/react';

export const Card = extendVariants(OCard, {
  defaultVariants: {},
});

export const CardHeader = extendVariants(OCardHeader, {
  defaultVariants: {},
});

export const CardBody = extendVariants(OCardBody, {
  defaultVariants: {},
});

export const CardFooter = extendVariants(OCardFooter, {
  defaultVariants: {},
});
