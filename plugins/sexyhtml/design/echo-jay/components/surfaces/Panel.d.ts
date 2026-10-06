import * as React from 'react';
/**
 * Raised surface with gold corner brackets. The container for controls, charts and grouped content.
 * @startingPoint section="Surfaces" subtitle="Raised, bracketed panel with a label row" viewport="700x200"
 */
export interface PanelProps {
  /** Mono label in the head row, e.g. 'FIG.01 // Series'. */
  label?: React.ReactNode;
  /** Right-aligned mono label. */
  meta?: React.ReactNode;
  /** Right-aligned gold figure (replaces meta). */
  figure?: React.ReactNode;
  /** No corner brackets. */
  plain?: boolean;
  /** Tighter padding for row lists. */
  list?: boolean;
  /** 10px column gap between children. */
  stack?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Panel(props: PanelProps): JSX.Element;
export default Panel;