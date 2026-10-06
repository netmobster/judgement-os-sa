import * as React from 'react';
import type { ChartHeadProps } from './Bars';
/** One accent line with round points on a baseline; the point that matters is larger. Values are counts. */
export interface LineChartProps extends ChartHeadProps {
  values: number[];
  /** Index of the emphasised point. Default: the last. -1 for none. */
  highlight?: number;
  max?: number;
  /** Default 0. */
  min?: number;
  axis?: React.ReactNode[];
  /** Default 72px. */
  height?: number | string;
  className?: string; style?: React.CSSProperties;
}
export declare function LineChart(props: LineChartProps): JSX.Element;