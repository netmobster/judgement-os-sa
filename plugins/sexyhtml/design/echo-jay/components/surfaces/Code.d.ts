import * as React from 'react';
/** Recessed mono code well with an optional label row. */
export interface CodeProps { label?: React.ReactNode; meta?: React.ReactNode; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Code(props: CodeProps): JSX.Element;
export default Code;