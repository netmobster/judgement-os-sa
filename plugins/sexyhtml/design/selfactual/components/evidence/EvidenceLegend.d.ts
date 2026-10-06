import * as React from 'react';
import type { EvidenceState } from './EvidenceTag';
export interface EvidenceLegendProps { states?: EvidenceState[]; className?: string; style?: React.CSSProperties; }
export declare function EvidenceLegend(props: EvidenceLegendProps): JSX.Element;