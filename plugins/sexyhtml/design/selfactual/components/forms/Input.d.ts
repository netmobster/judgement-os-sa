import * as React from 'react';
/** @startingPoint section="Forms" subtitle="Text input and textarea on native elements" viewport="700x120" */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { /** Render a textarea (min-height 90px, vertical resize). */ multiline?: boolean; }
export declare function Input(props: InputProps): JSX.Element;