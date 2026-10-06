import * as React from 'react';
/** Chamfered switch with an ON/OFF readout. With a label it renders a full row (text left, switch right). */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Row text. Omit for a bare switch. */
  label?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): JSX.Element;
/** A bracketed panel holding switch rows. */
export interface SwitchListProps { label?: React.ReactNode; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function SwitchList(props: SwitchListProps): JSX.Element;
export default Switch;