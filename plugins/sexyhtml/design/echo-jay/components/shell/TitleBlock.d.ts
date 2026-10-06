import * as React from 'react';
/** Title, subtitle and dashed-rule byline under the header. */
export interface TitleBlockProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** A node, or [left, right]. */
  byline?: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function TitleBlock(props: TitleBlockProps): JSX.Element;
export default TitleBlock;