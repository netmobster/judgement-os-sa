import * as React from 'react';
/** The gold-ground proof line: what was done, stamped with who and when. One per artifact. */
export interface ReceiptProps { label?: React.ReactNode; /** Mono stamp at the right, e.g. 'CC · MM.DD'. */ stamp?: React.ReactNode; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Receipt(props: ReceiptProps): JSX.Element;
export default Receipt;