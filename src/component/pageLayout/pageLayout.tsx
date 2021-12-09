import React, { useEffect, useState } from "react";
import { Grid } from 'antd-mobile'
import { MyIcon, NavigateBar } from '../../component'
import { getIconList } from "../../services/icons";

import './index.scss'

export const PageLayout = props => {
    const { children } = props;
    const [iconList, setIconList] = useState([]);

    useEffect(() => {
        getIcons()
    }, [])

    const getIcons = () => {
        getIconList().then(res => {
            setIconList(res.data);
        })
    }

    return (
        <div className="page-layout-container">
            <div className="page-layout-top">
                <NavigateBar backArrow={false}>添加</NavigateBar>
            </div>
            <div className="page-layout-body">
                {children}
            </div>
        </div>
    )
}