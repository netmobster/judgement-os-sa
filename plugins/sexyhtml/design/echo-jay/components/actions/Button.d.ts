import * as React from 'react';
/**
 * Squared, uppercase action. Primary is gold with a chamfered corner; secondary is a raised surface; ghost is text.
 * @startingPoint section="Actions" subtitle="Primary gold chamfer, raised secondary, ghost" viewport="700x140"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm';
  /** 14px Lucide SVG rendered before the label. */
  icon?: React.ReactNode;
  /** Render as another element, e.g. 'a'. */
  as?: React.ElementType;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
export default Button;