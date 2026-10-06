import * as React from 'react';
/** Mono uppercase chip with a chamfered corner. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'gold' | 'steel' | 'ok' | 'alert';
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
export default Tag;