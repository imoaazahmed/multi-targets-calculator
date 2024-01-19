import {
  extendVariants,
  Table as OTable,
  TableBody as OTableBody,
  TableCell as OTableCell,
  TableColumn as OTableColumn,
  TableHeader as OTableHeader,
  TableRow as OTableRow,
} from '@nextui-org/react';

export const Table = extendVariants(OTable, {
  defaultVariants: {},
});

export const TableHeader = OTableHeader;

export const TableBody = OTableBody;

export const TableColumn = OTableColumn;

export const TableRow = OTableRow;

export const TableCell = OTableCell;
