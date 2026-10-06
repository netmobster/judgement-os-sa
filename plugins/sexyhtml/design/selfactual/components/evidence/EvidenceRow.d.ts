import * as React from 'react';
import type { EvidenceState } from './EvidenceTag';
/** @startingPoint section="Evidence" subtitle="The ledger row — figure · claim · tag" viewport="700x200" */
export interface EvidenceRowProps {
  /** The number or short figure, set in the heading face. */
  figure: React.ReactNode;
  claim?: React.ReactNode;
  children?: React.ReactNode;
  state?: EvidenceState;
  /** Override the tag text, e.g. "measured · staging". */
  tagLabel?: React.ReactNode;
  /** Flat on surface instead of lifted on white. Defaults to true for hypothesis. */
  open?: boolean;
  className?: string; style?: React.CSSProperties;
}
export declare function EvidenceRow(props: EvidenceRowProps): JSX.Element;