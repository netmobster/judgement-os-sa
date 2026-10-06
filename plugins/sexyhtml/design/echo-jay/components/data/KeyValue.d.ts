import * as React from 'react';
/** Two-column key/value list: mono keys, sans values. */
export interface KeyValueProps { items?: Array<[React.ReactNode, React.ReactNode]>; className?: string; style?: React.CSSProperties; }
export declare function KeyValue(props: KeyValueProps): JSX.Element;
export default KeyValue;