import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
export interface ComparisonSide {
  /** "The old way", "Before", "The swap", "After". */
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  /** A string renders as card-body; a node renders as-is. */
  body?: React.ReactNode;
  /** Extra meta text before the tag. */
  meta?: React.ReactNode;
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
}
/** Before beside after, or the old way beside the swap — two cards with the fixed card anatomy. The after card is the turn. */
export interface ComparisonProps {
  before: ComparisonSide;
  after: ComparisonSide;
  /** Stack vertically. */
  stack?: boolean;
  className?: string; style?: React.CSSProperties;
}
export declare function Comparison(props: ComparisonProps): JSX.Element;