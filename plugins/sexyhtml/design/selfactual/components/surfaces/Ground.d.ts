import * as React from 'react';
export interface GroundProps extends React.HTMLAttributes<HTMLDivElement> { /** The ink ground. Every child rebinds its accent and text tokens. */ ink?: boolean; }
export declare function Ground(props: GroundProps): JSX.Element;
/** The headline turn — the second clause of a headline, in accent. */
export declare function Hl(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;