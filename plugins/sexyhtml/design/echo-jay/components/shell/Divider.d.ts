import * as React from 'react';
/** Hazard-stripe divider. Steel by default; gold for a hard section break. */
export interface DividerProps { gold?: boolean; /** Inset to the content gutter. */ inset?: boolean; className?: string; style?: React.CSSProperties; }
export declare function Divider(props: DividerProps): JSX.Element;
export default Divider;