import * as React from 'react';
export interface TableProps { columns?: React.ReactNode[]; /** Cells may be nodes — put an EvidenceTag in status cells. */ rows?: React.ReactNode[][]; children?: React.ReactNode; className?: string; style?: React.CSSProperties; }
export declare function Table(props: TableProps): JSX.Element;