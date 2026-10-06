import * as React from 'react';
/** @startingPoint section="Actions" subtitle="Squared actions — never pills" viewport="700x120" */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  /** A Lucide SVG (stroke-width 2) rendered before the label. */
  icon?: React.ReactNode;
  /** 34×34 square, label hidden — pass aria-label. */
  iconOnly?: boolean;
  block?: boolean;
  /** Render as an anchor or other element. */
  as?: React.ElementType;
}
export declare function Button(props: ButtonProps): JSX.Element;