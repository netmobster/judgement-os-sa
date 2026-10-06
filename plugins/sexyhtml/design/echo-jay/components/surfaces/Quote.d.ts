import * as React from 'react';
/** A spoken or written line in a recessed well with a steel edge; who said it and where in mono. */
export interface QuoteProps {
  /** Who said or wrote it. */
  who?: React.ReactNode;
  /** Where: the meeting, the doc, the channel, the date. */
  where?: React.ReactNode;
  /** Gold edge when the quote is the point of the block. */
  gold?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
export declare function Quote(props: QuoteProps): JSX.Element;
export default Quote;