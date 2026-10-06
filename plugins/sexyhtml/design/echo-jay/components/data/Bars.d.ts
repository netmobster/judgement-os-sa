import * as React from 'react';
/** A small bar chart in a recessed well: steel bars, one gold. Values are counts. */
export interface BarsProps {
  values?: number[];
  /** Index of the gold bar. Default: the last. Pass -1 for none. */
  highlight?: number;
  /** Dashed gold target line, in the same units as values. */
  target?: number;
  /** Axis labels spread left to right, e.g. ['MM.DD', 'MM.DD']. */
  axis?: React.ReactNode[];
  /** Scale maximum. Default: the largest value. */
  max?: number;
  /** Mono y axis showing max and 0. */
  axisY?: boolean;
  /** Well height. Default 72px (44px inside SmallMultiples, 260px on a slide). */
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Bars(props: BarsProps): JSX.Element;
export default Bars;