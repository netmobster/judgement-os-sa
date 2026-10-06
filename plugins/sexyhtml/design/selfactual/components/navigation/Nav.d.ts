import * as React from 'react';
export interface NavLink { label: React.ReactNode; href?: string; current?: boolean; onClick?: React.MouseEventHandler; }
/** @startingPoint section="Navigation" subtitle="The header bar" viewport="700x120" */
export interface NavProps { brand?: string; /** Path to the wordmark PNG; replaces the text brand. */ logo?: string; links?: NavLink[]; /** Trailing action, usually a primary Button. */ action?: React.ReactNode; className?: string; style?: React.CSSProperties; }
export declare function Nav(props: NavProps): JSX.Element;