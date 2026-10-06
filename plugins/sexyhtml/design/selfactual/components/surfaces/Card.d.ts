import * as React from 'react';
/** @startingPoint section="Surfaces" subtitle="White card, 16px radius, barely lifted" viewport="700x200" */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  kicker?: React.ReactNode; title?: React.ReactNode; meta?: React.ReactNode;
  /** The one card that matters on a slide: 3px accent border, no shadow. */
  focus?: boolean;
  /** An ink card dropped into a light layout — the punchline. */
  ink?: boolean;
  /** A string renders as .card-body; nodes render as-is. */
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;