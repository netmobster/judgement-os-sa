import * as React from 'react';
/** @startingPoint section="Slides" subtitle="1920×1080 slide chrome — kicker, argument, folio" viewport="1280x720" */
export interface SlideProps extends React.HTMLAttributes<HTMLElement> {
  /** The ink ground — for the cover, the turns and the close. */
  ink?: boolean;
  /** Top-left kicker, e.g. "02 · The problem". When omitted the logo sits top-left instead (cover/close pattern). */
  kicker?: React.ReactNode;
  date?: React.ReactNode; number?: React.ReactNode;
  /** Path to the wordmark PNG. */
  logo?: string; showLogo?: boolean;
  /** 76px headline. Put the turn in <Hl>. */
  title?: React.ReactNode;
  /** 132px cover headline. */
  display?: React.ReactNode;
  lead?: React.ReactNode;
  /** Replaces the bottom-left folio content (default: the logo on kicker slides). */
  foot?: React.ReactNode;
  /** Free-form middle content. */
  children?: React.ReactNode;
}
export declare function Slide(props: SlideProps): JSX.Element;