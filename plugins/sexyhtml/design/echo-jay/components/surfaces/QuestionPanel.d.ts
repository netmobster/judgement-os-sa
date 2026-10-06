import * as React from 'react';
export interface QuestionOption { name: React.ReactNode; /** One line: what choosing it means. */ meaning?: React.ReactNode; recommended?: boolean; /** Label beside the recommended option. Default 'recommended'. */ tag?: React.ReactNode; }
/** One decision: a question, three or four options as rows, the recommended one marked in gold, a recessed note. */
export interface QuestionPanelProps {
  /** Numbered label, e.g. 'Q.01 // Decision'. */
  label?: React.ReactNode;
  question: React.ReactNode;
  options: QuestionOption[];
  /** Index of the recommended option (overrides option.recommended). */
  recommended?: number;
  /** Controlled selection. Rows become buttons when onSelect is given. */
  selected?: number;
  onSelect?: (index: number, option: QuestionOption) => void;
  note?: React.ReactNode;
  noteLabel?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Alternative to note. */
  children?: React.ReactNode;
}
export declare function QuestionPanel(props: QuestionPanelProps): JSX.Element;
export default QuestionPanel;