import * as React from 'react';
/** Recessed text input. multiline renders a textarea; options renders a select. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: boolean;
  /** Render a <select> with these options. */
  options?: Array<string | { value: string; label: string }>;
}
export declare function Input(props: InputProps): JSX.Element;
export default Input;