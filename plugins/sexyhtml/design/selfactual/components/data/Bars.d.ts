import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
/** figure (a count out of a total) · label · tag, above a chart. */
export interface ChartHeadProps { figure?: React.ReactNode; label?: React.ReactNode; state?: EvidenceState; tagLabel?: React.ReactNode; }
export declare function ChartHead(props: ChartHeadProps): JSX.Element | null;
/** Flat bars on one baseline: accent-200 with one accent-600. Values are counts. */
export interface BarsProps extends ChartHeadProps {
  values: number[];
  /** Index of the accent bar. Default: the last. -1 for none. */
  highlight?: number;
  /** Scale maximum (the total). Default: the largest value. */
  max?: number;
  /** Axis labels spread left to right. */
  axis?: React.ReactNode[];
  /** Default 72px. */
  height?: number | string;
  className?: string; style?: React.CSSProperties;
}
export declare function Bars(props: BarsProps): JSX.Element;