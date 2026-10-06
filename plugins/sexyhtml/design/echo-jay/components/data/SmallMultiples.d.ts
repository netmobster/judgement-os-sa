import * as React from 'react';
export interface Multiple { label: React.ReactNode; values: number[]; /** Count shown at the right. Default: the last value. */ count?: React.ReactNode; axis?: React.ReactNode[]; /** The one gold multiple. */ hi?: boolean; }
/** A strip of small charts on one shared scale, hairlines between. Only the highlighted cell carries gold. */
export interface SmallMultiplesProps {
  items: Multiple[];
  kind?: 'bars' | 'line';
  /** Default: min(3, items). */
  columns?: number;
  /** Shared scale maximum. Default: the largest value across all items. */
  max?: number;
  /** Index of the gold multiple (overrides item.hi). */
  hi?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function SmallMultiples(props: SmallMultiplesProps): JSX.Element;
export default SmallMultiples;