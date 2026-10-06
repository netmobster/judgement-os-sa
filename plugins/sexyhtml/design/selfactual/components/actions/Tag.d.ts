import * as React from 'react';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Non-evidence label tone. If the label says how TRUE something is, use EvidenceTag instead. */
  tone?: 'accent' | 'accent-2' | 'neutral' | 'outline';
}
export declare function Tag(props: TagProps): JSX.Element;