import React from "react";
import { NavBar } from "antd-mobile";
import { NavigateBarProps } from "./interface";

import './index.scss'

export const NavigateBar: React.FC<NavigateBarProps> = props => {
    const { children, left, back, backArrow: backArrow = true, onBack } = props;

    const handleBack = () => {
        console.log(111)
    }

    return (
        <NavBar
            className="navigate-bar"
            left={left}
            back={back}
            backArrow={backArrow}
            onBack={onBack ? onBack : handleBack}>
            {children}
        </NavBar>
    )
}