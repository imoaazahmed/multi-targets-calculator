import {
  extendVariants,
  Pagination as OPagination,
  PaginationCursor as OPaginationCursor,
  PaginationItem as OPaginationItem,
} from '@nextui-org/react';

export const Pagination = extendVariants(OPagination, {});

export const PaginationItem = extendVariants(OPaginationItem, {});

export const PaginationCursor = extendVariants(OPaginationCursor, {});
