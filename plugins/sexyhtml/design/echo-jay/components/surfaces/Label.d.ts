import * as React from 'react';
/** Mono 11px uppercase label. With right, renders a two-ended label row. */
export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  /** Right-aligned second label; switches to a row layout. */
  right?: React.ReactNode;
  as?: React.ElementType;
  children?: React.ReactNode;
}
export declare function Label(props: LabelProps): JSX.Element;
/** Condensed gold count with a glow (.ej-figure). */
export interface CountProps extends React.HTMLAttributes<HTMLSpanElement> { children?: React.ReactNode; }
export declare function Count(props: CountProps): JSX.Element;
export default Label;