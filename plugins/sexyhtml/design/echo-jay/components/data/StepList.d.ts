import * as React from 'react';
export interface Step { title: React.ReactNode; note?: React.ReactNode; /** done → steel tag, next → gold tag, blocked → alert tag. */ state?: 'done' | 'next' | 'blocked'; /** Tag text; defaults to the state. */ tag?: React.ReactNode; /** Override the number. */ num?: React.ReactNode; }
/** Numbered steps in a raised list, each with a state tag and an optional note. */
export interface StepListProps {
  steps: Step[];
  /** First number. Default 1. */
  start?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function StepList(props: StepListProps): JSX.Element;
export default StepList;