import React from 'react';
import { HashRouter, Route, Router, Routes } from 'react-router-dom';
import { ReceiptOutline, PicturesOutline, UserOutline, HistogramOutline, AddSquareOutline } from 'antd-mobile-icons'

import 'reset-css';
import { BaseLayout } from './baseLayout';
import { Home } from './home';
import './index.scss'
import { Add } from './add';
import { Login } from './login';

export const App: React.FC<any> = props => {
    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <ReceiptOutline />
        },
        {
            key: '/charts',
            title: '图标',
            icon: <HistogramOutline />
        },
        {
            key: '/add',
            title: '记账',
            icon: <AddSquareOutline />
        },
        {
            key: '/message',
            title: '社区',
            icon: <PicturesOutline />
        },
        {
            key: '/me',
            title: '个人中心',
            icon: <UserOutline />
        },
    ]

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<BaseLayout tabs={tabs} />}  >
                    <Route element={<Home />} key="/home" path="/home" />
                    <Route element={<Home />} key="/charts" path="/charts" />
                    <Route element={<Add />} key="/add" path="/add" />
                    <Route element={<Home />} key="/home" path="/home" />
                    <Route element={<Home />} key="/me" path="/me" />
                </Route>
            </Routes>
        </HashRouter>
    )
}