import * as React from 'react';
/** Label + control + optional hint. */
export interface FieldProps { label?: React.ReactNode; /** id of the control, for the label. */ id?: string; hint?: React.ReactNode; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Field(props: FieldProps): JSX.Element;
export default Field;