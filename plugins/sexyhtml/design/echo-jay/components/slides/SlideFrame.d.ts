import * as React from 'react';
/**
 * A 1920×1080 slide: nameplate, numbered label, title, body, mono footer. Literal px; nothing below 24px.
 * @startingPoint section="Slides" subtitle="Nameplate, label, title, body, footer — light or ink" viewport="960x540"
 */
export interface SlideFrameProps extends React.HTMLAttributes<HTMLElement> {
  /** Default 'ECHO-JAY'. */
  wordmark?: React.ReactNode;
  /** Numbered label, e.g. '02 // The problem'. */
  label?: React.ReactNode;
  title?: React.ReactNode;
  /** 'sm' = 64px instead of 84px, for long titles. */
  titleSize?: 'sm';
  /** A node, or [left, right]. */
  footer?: React.ReactNode | React.ReactNode[];
  /** Pin the ground. Default: inherits. */
  theme?: 'light' | 'dark';
  /** Render scaled from the top-left, e.g. 0.5 for a 960×540 preview. */
  scale?: number;
  children?: React.ReactNode;
}
export declare function SlideFrame(props: SlideFrameProps): JSX.Element;
export default SlideFrame;