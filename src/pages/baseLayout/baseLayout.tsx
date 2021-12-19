import { NavBar, SafeArea, TabBar } from "antd-mobile";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import './baseLayout.scss'

export const BaseLayout: React.FC<any> = props => {
    const { tabs } = props;
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    useEffect(() => {
        if (location.pathname === '/') {
            navigate("home")
        }
    }, [])
    const setRouteActive = (value: string) => {
        navigate(value)
    }

    return (
        <div className="baselayout-container">
            <SafeArea position='top' />
            {/* <div className="baselayout-top">
                <NavBar>配合路由使用</NavBar>
            </div> */}
            <div className="baselayout-body">
                <Outlet />
            </div>
            <div className="baselayout-bottom">
                <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
            <SafeArea position='bottom' />
        </div>
    )
}