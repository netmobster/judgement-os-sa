import * as React from 'react';
export interface ConsoleAction { label: React.ReactNode; primary?: boolean; onClick?: () => void; }
export interface ConsoleInsight { label?: React.ReactNode; text: React.ReactNode; actions?: ConsoleAction[]; }
export interface ConsoleRow { key: React.ReactNode; value: React.ReactNode; state?: React.ReactNode; locked?: boolean; }
export interface ConsoleSection { title: React.ReactNode; count?: React.ReactNode; rows?: ConsoleRow[]; }
/** @startingPoint section="Product" subtitle="The Insights window — real screens only" viewport="700x360" */
export interface ConsoleProps { brand?: string; product?: string; /** Mono status line after the dot, e.g. "heartbeat · 3 windows open". */ status?: React.ReactNode; insight?: ConsoleInsight; sections?: ConsoleSection[]; className?: string; style?: React.CSSProperties; children?: React.ReactNode; }
export declare function Console(props: ConsoleProps): JSX.Element;
/** The loop line — the machine describing its own cycle. */
export declare function ConsoleLoop(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;