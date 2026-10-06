import * as React from 'react';
export interface TimelineItem { /** Mono date, e.g. '09.22' or '2026.09.22'. */ date: React.ReactNode; title: React.ReactNode; /** One line. */ line?: React.ReactNode; /** done = steel square, next = gold square (one per timeline), open = hollow square and a dashed line. */ state?: 'done' | 'next' | 'open'; }
/** Dated steps down the page; horizontal runs them across (slides). */
export interface TimelineProps {
  items: TimelineItem[];
  horizontal?: boolean;
  /** Width of the date column (vertical only). Default 60px. */
  dateWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Timeline(props: TimelineProps): JSX.Element;
export default Timeline;