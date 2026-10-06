import * as React from 'react';
/** @startingPoint section="Evidence" subtitle="The swap list — label · verb · items" viewport="700x220" */
export interface StackRowProps {
  label: React.ReactNode;
  verb: React.ReactNode;
  /** Each item renders as its own inline span; put an EvidenceTag inside. */
  items?: React.ReactNode[];
  children?: React.ReactNode;
  /** The invariant row: ink ground, accent border. Always last. */
  keep?: boolean;
  /** Override grid-template-columns (default 120px 170px 1fr). */
  columns?: string;
  /** Style for the items container — e.g. a slide-scale fontSize. */
  itemsStyle?: React.CSSProperties;
  className?: string; style?: React.CSSProperties;
}
export declare function StackRow(props: StackRowProps): JSX.Element;