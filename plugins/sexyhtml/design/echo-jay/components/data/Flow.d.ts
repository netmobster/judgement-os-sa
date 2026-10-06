import * as React from 'react';
/**
 * Boxes and arrows for architecture and process diagrams. Arrows are inserted between children.
 * @startingPoint section="Data" subtitle="Nodes and arrows — the architecture diagram" viewport="700x170"
 */
export interface FlowProps { vertical?: boolean; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Flow(props: FlowProps): JSX.Element;
/** A raised node with a steel corner bracket. hi turns it gold; well recesses it (a store or sink). */
export interface NodeProps { title?: React.ReactNode; /** Mono sub-label under the title. */ sub?: React.ReactNode; hi?: boolean; well?: boolean; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Node(props: NodeProps): JSX.Element;
export default Flow;