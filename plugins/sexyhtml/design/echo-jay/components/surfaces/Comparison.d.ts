import * as React from 'react';
export interface ComparisonSide { /** Mono label: 'A // Before', 'B // After'. */ label: React.ReactNode; title?: React.ReactNode; /** Text, a list, anything. */ body?: React.ReactNode; chosen?: boolean; }
/** Two panels side by side — before/after or option A/B. The chosen one wears the gold brackets. */
export interface ComparisonProps {
  /** Exactly two. */
  sides: ComparisonSide[];
  /** Index of the chosen side (overrides side.chosen). */
  chosen?: 0 | 1;
  /** Right-hand label on the chosen side. Default 'chosen'. */
  chosenLabel?: React.ReactNode;
  /** Stack vertically for long content. */
  stack?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Comparison(props: ComparisonProps): JSX.Element;
export default Comparison;