import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
export interface Multiple {
  /** Uppercase label, e.g. "One". */
  label: React.ReactNode;
  values: number[];
  /** The cell's count out of a total, e.g. "14 of 35". */
  figure?: React.ReactNode;
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
  highlight?: number;
  axis?: React.ReactNode[];
}
/** Small cards of Bars or LineCharts on one shared scale, each with its own tagged figure. */
export interface SmallMultiplesProps {
  items: Multiple[];
  kind?: 'bars' | 'line';
  /** Default min(3, items). */
  columns?: number;
  /** Shared scale maximum. Default: the largest value across all items. */
  max?: number;
  className?: string; style?: React.CSSProperties;
}
export declare function SmallMultiples(props: SmallMultiplesProps): JSX.Element;