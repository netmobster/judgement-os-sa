import * as React from 'react';
export interface LayerItem { title: React.ReactNode; sub?: React.ReactNode; hi?: boolean; /** Recessed: a store. */ well?: boolean; }
export interface Layer { /** Mono band label. */ label: React.ReactNode; items: Array<string | LayerItem>; /** Verb on the arrow coming down from the band above, e.g. 'renders', 'reads · writes'. */ via?: React.ReactNode; /** The one gold band. */ hi?: boolean; }
/** Stacked bands of boxes — an architecture by layer — with a verb between bands. */
export interface LayersProps { layers: Layer[]; /** Label column width. Default 88px. */ labelWidth?: number | string; className?: string; style?: React.CSSProperties; }
export declare function Layers(props: LayersProps): JSX.Element;
export default Layers;