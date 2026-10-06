import * as React from 'react';
import type { EvidenceState } from './EvidenceTag';
export interface TimelineItem {
  /** "Jul 2026", "Now", "Q1 2027" — set as an uppercase label. */
  date: React.ReactNode;
  title: React.ReactNode;
  /** One line under the title. */
  line?: React.ReactNode;
  /** The row's evidence tag. Default building. */
  state?: EvidenceState;
  /** Override the tag text, e.g. "measured · staging". */
  tagLabel?: React.ReactNode;
  /** This row is the turn: ink with the 3px accent border (paper inside .on-ink). */
  current?: boolean;
  /** Flat on surface. Defaults to true for hypothesis. */
  open?: boolean;
}
/** @startingPoint section="Evidence" subtitle="A roadmap of dated rows — the current one on ink, every row tagged" viewport="700x240" */
export interface TimelineProps {
  items: TimelineItem[];
  /** Index of the current row (overrides item.current). */
  current?: number;
  className?: string; style?: React.CSSProperties;
}
export declare function Timeline(props: TimelineProps): JSX.Element;