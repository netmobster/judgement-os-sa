import * as React from 'react';
export interface Stat { /** A count — never a percentage or a score. */ value: React.ReactNode; label: React.ReactNode; /** Mono sub-line, e.g. '14 days' or '+2'. */ sub?: React.ReactNode; /** The one gold figure. */ hi?: boolean; }
/**
 * Two to four counts, each a big condensed figure over a mono label, in one raised strip. At most one figure is gold.
 * @startingPoint section="Data" subtitle="Two to four counts, one gold" viewport="700x120"
 */
export interface StatRowProps {
  stats: Stat[];
  /** Index of the gold figure (overrides stat.hi). Only one is ever gold. */
  hi?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function StatRow(props: StatRowProps): JSX.Element;
export default StatRow;