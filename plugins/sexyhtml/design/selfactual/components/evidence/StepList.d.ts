import * as React from 'react';
import type { EvidenceState } from './EvidenceTag';
export interface Step {
  title: React.ReactNode;
  note?: React.ReactNode;
  /** The step's evidence tag. Default building. */
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
  /** Override the number ("01"). */
  num?: React.ReactNode;
  /** Flat on surface. Defaults to true for hypothesis. */
  open?: boolean;
}
/** Numbered steps, each a ledger-style row with its evidence tag. The number is set in the heading face like a figure. */
export interface StepListProps {
  steps: Step[];
  /** First number. Default 1. */
  start?: number;
  className?: string; style?: React.CSSProperties;
}
export declare function StepList(props: StepListProps): JSX.Element;