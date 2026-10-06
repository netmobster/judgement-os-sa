import * as React from 'react';
export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> { /** Optional lift. Panels are flat by default. */ elevation?: 'sm' | 'md' | 'lg'; }
export declare function Panel(props: PanelProps): JSX.Element;