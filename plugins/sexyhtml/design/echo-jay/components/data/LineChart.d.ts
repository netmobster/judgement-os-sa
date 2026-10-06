import * as React from 'react';
/** A line with square points in a recessed well; the point that matters in gold. Values are counts. */
export interface LineChartProps {
  /** Counts, left to right. */
  values: number[];
  /** Index of the gold point. Default: the last. Pass -1 for none. */
  highlight?: number;
  /** Dashed gold target line, in the same units as values. */
  target?: number;
  /** Axis labels spread left to right. */
  axis?: React.ReactNode[];
  max?: number;
  /** Default 0. */
  min?: number;
  /** Mono y axis showing max and min. */
  axisY?: boolean;
  /** Print each count above its point. */
  showValues?: boolean;
  /** Well height. Default 72px. */
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function LineChart(props: LineChartProps): JSX.Element;
export default LineChart;