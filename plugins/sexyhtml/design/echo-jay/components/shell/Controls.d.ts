import * as React from 'react';
/** Theme (light / dark) and text-size (A− / A+) controls. Writes data-theme and data-size on <html> and persists them in localStorage (ej-theme, ej-size). */
export interface ControlsProps {
  /** Show the DARK / LIGHT toggle. Default true. */
  showTheme?: boolean;
  /** Show the A− / A+ buttons. Default true. */
  showSize?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Controls(props: ControlsProps): JSX.Element;
export default Controls;