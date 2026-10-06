import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
export interface QuestionOption {
  name: React.ReactNode;
  /** One line: what choosing it means. */
  meaning?: React.ReactNode;
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
  recommended?: boolean;
  /** Label on the recommended option. Default "Recommended". */
  recLabel?: React.ReactNode;
  /** Flat on surface. Defaults to true for hypothesis. */
  open?: boolean;
}
/** One decision in a panel: kicker, Caprasimo question, three or four option rows (the recommended one with the 3px accent border), and a rule-note. */
export interface QuestionPanelProps {
  /** "Decision · 01" */
  kicker?: React.ReactNode;
  question: React.ReactNode;
  options: QuestionOption[];
  /** Index of the recommended option (overrides option.recommended). */
  recommended?: number;
  /** Controlled selection; rows become buttons when onSelect is given. */
  selected?: number;
  onSelect?: (index: number, option: QuestionOption) => void;
  /** The note box — rendered as a rule-note. */
  note?: React.ReactNode;
  className?: string; style?: React.CSSProperties;
  /** Alternative to note. */
  children?: React.ReactNode;
}
export declare function QuestionPanel(props: QuestionPanelProps): JSX.Element;