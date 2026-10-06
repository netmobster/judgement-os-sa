import * as React from 'react';
import type { EvidenceState } from '../evidence/EvidenceTag';
export interface LayerItem { name: React.ReactNode; state?: EvidenceState; tagLabel?: React.ReactNode; }
export interface Layer {
  /** e.g. "Layer one", "The constant". */
  label: React.ReactNode;
  /** "Swap the model", "Don't swap this". */
  verb?: React.ReactNode;
  items: Array<string | LayerItem>;
  /** Verb on the arrow coming down from the band above, e.g. "swaps freely", "all of them run on". */
  via?: React.ReactNode;
  /** This band is the turn — the operator layer. */
  keep?: boolean;
}
/** The stack as a diagram: bands of boxes top to bottom, a verb between bands, the operator layer on ink at the bottom. */
export interface LayersProps { layers: Layer[]; className?: string; style?: React.CSSProperties; }
export declare function Layers(props: LayersProps): JSX.Element;