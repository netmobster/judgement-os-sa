import * as React from 'react';
/**
 * The artifact: nameplate header with readout slot, content, footer. Fills the host pane; framed previews it at 500px.
 * @startingPoint section="Shell" subtitle="A complete sidebar artifact — header, readout, title block, content, footer" viewport="540x900"
 */
export interface ShellProps {
  /** Nameplate text. Default 'ECHO-JAY'. */
  wordmark?: React.ReactNode;
  /** Mono label beside the nameplate, e.g. '01 // Label'. */
  meta?: React.ReactNode;
  /** A <Readout> rendered under the nameplate row. */
  readout?: React.ReactNode;
  /** true renders <Controls />; false renders none; a node replaces them. Default true. */
  controls?: boolean | React.ReactNode;
  /** Footer content: a node, or [left, right]. */
  footer?: React.ReactNode | React.ReactNode[];
  /** Preview at 500px with a frame shadow instead of filling the pane. */
  framed?: boolean;
  /** Wrap in the gridded desk (for framed previews). */
  desk?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Shell(props: ShellProps): JSX.Element;
export default Shell;