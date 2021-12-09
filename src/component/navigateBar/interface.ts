import React, { ReactElement } from "react";

export interface NavigateBarProps {
    children?: ReactElement;
    left?: string | ReactElement;
    right?: string | ReactElement;
    default?: boolean;
    back?: string;
    backArrow: boolean | ReactElement;
    onBack?: () => void;
}