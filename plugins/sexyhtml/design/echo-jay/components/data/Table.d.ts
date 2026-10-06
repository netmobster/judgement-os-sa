import * as React from 'react';
export interface TableColumn { label: React.ReactNode; /** Right-aligned mono numbers. */ num?: boolean; /** Mono gold identifier column. */ key?: boolean; /** Secondary (muted) column. */ muted?: boolean; }
/**
 * Raised data table with a steel-tinted mono header row.
 * @startingPoint section="Data" subtitle="Steel head, gold key column, right-aligned numbers" viewport="700x220"
 */
export interface TableProps {
  columns?: Array<string | TableColumn>;
  /** Row cells, in column order. */
  rows?: React.ReactNode[][];
  /** Wrap in a horizontal-scroll container. Default true. */
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Custom <tr> children when rows is empty. */
  children?: React.ReactNode;
}
export declare function Table(props: TableProps): JSX.Element;
export default Table;