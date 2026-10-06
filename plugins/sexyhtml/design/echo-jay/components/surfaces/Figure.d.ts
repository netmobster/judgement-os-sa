import * as React from 'react';
/** The numbered frame ("FIG.01 // caption") for any chart or drawing, with a one-sentence caption that states its point. Steel brackets. */
export interface FigureProps {
  /** 'FIG.01' */
  num?: React.ReactNode;
  /** Short title after the number. */
  label?: React.ReactNode;
  /** Right-hand mono label, e.g. '14 days'. */
  meta?: React.ReactNode;
  /** One sentence. Bold the finding with <b>. */
  caption?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
export declare function Figure(props: FigureProps): JSX.Element;
export default Figure;