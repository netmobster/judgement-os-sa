import * as React from 'react';
/**
 * A raised note with a 3px edge in the variant color: info (steel), warning (alert), decision (gold).
 * @startingPoint section="Surfaces" subtitle="Info, warning and decision callouts" viewport="700x170"
 */
export interface CalloutProps {
  variant?: 'info' | 'warning' | 'decision';
  /** Numbered mono label, e.g. '05 // Note'. */
  label?: React.ReactNode;
  title?: React.ReactNode;
  /** Button label (a small button), or a custom node. */
  action?: React.ReactNode;
  onAction?: () => void;
  /** Variant when action is a string. Default 'secondary'; 'primary' makes the action the block's gold. */
  actionVariant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  style?: React.CSSProperties;
  /** One or two sentences. */
  children?: React.ReactNode;
}
export declare function Callout(props: CalloutProps): JSX.Element;
export default Callout;