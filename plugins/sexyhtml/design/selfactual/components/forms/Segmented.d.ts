import * as React from 'react';
export interface SegmentedOption { value: string; label: React.ReactNode; }
export interface SegmentedProps {
  options: (SegmentedOption | string)[];
  value?: string; defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string; className?: string; style?: React.CSSProperties;
}
export declare function Segmented(props: SegmentedProps): JSX.Element;