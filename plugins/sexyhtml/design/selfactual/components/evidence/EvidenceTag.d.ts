import * as React from 'react';
export type EvidenceState = 'shipped' | 'measured' | 'building' | 'hypothesis' | 'open';
/** @startingPoint section="Evidence" subtitle="The tag every claim wears" viewport="700x120" */
export interface EvidenceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** How true the claim is. shipped = exists; measured = a number behind it; building = in flight; hypothesis = a claim, labelled. */
  state?: EvidenceState;
  /** Override the label (e.g. "measured · staging"). Defaults to the state name. */
  children?: React.ReactNode;
}
export declare function EvidenceTag(props: EvidenceTagProps): JSX.Element;