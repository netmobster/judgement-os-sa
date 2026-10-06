import * as React from 'react';
export interface SequenceActor { name: React.ReactNode; sub?: React.ReactNode; hi?: boolean; /** Recessed: a store or sink. */ well?: boolean; }
export interface SequenceMessage { /** Actor index or name. */ from: number | string; to: number | string; /** A verb: 'sends request', 'reads record'. */ label: React.ReactNode; /** The one gold message. */ hi?: boolean; /** Dashed line: a reply. */ reply?: boolean; }
/**
 * Sequence diagram: actors across the top, messages down, verbs on the arrows. Three or four actors at 500px.
 * @startingPoint section="Data" subtitle="Actors across, messages down" viewport="700x260"
 */
export interface SequenceProps { actors: Array<string | SequenceActor>; messages: SequenceMessage[]; className?: string; style?: React.CSSProperties; }
export declare function Sequence(props: SequenceProps): JSX.Element;
export default Sequence;