import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
/** A numbered frame for a chart or diagram. The caption states the claim and wears its tag. */
export interface FigureProps {
  /** "Fig. 01" */
  num?: React.ReactNode;
  /** Short label after the number. */
  label?: React.ReactNode;
  /** The claim, stated once. Bold the figure with <b>. */
  claim?: React.ReactNode;
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
  className?: string; style?: React.CSSProperties;
  children: React.ReactNode;
}
export declare function Figure(props: FigureProps): JSX.Element;