import * as React from 'react';
export interface ReadoutItem { text: React.ReactNode; /** Gold + breathing glow: a value that is live. */ live?: boolean; /** Blinking gold dot before the text. */ dot?: boolean; }
/** The mono readout strip under the nameplate: items separated by //, optional right-aligned end item. */
export interface ReadoutProps {
  items?: Array<string | ReadoutItem>;
  /** Pushed to the right edge. */
  end?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Readout(props: ReadoutProps): JSX.Element;
export default Readout;