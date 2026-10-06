import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
export interface FlowNode {
  /** Uppercase label above the title, e.g. "Source", "Step". */
  sub?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  state?: EvidenceState;
  tagLabel?: React.ReactNode;
  /** This node is the turn (ink, 3px accent border) — the operator layer. */
  turn?: boolean;
}
/**
 * Boxes and arrows. Every arrow carries a verb: verbs[i] labels the arrow after nodes[i].
 * @startingPoint section="Data" subtitle="Boxes and arrows, every arrow a verb" viewport="700x180"
 */
export interface FlowProps {
  nodes: FlowNode[];
  /** One fewer than nodes. */
  verbs?: React.ReactNode[];
  vertical?: boolean;
  className?: string; style?: React.CSSProperties;
}
export declare function Flow(props: FlowProps): JSX.Element;