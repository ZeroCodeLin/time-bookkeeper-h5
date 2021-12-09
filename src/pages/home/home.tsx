import { List, Space } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MyIcon, NavigateBar, PageLayout } from '../../component'
import { getBillList } from "../../services";

import './index.scss'

export const Home = props => {
    const [list, setList] = useState([])
    useEffect(() => {
        getBillList({}).then(res => {
            setList(res.data)
        })
    }, [])

    const getDay = (time: number) => {
        const day = dayjs(time).format('MM月DD日');
        return day
    }
    const getWeek = (time: number) => {
        const week = dayjs(time).day();
        let weekStr = '';

        switch (week) {
            case 0:
                weekStr = '星期一'
                break;
            case 1:
                weekStr = '星期二'
                break;
            case 2:
                weekStr = '星期三'
                break;
            case 3:
                weekStr = '星期四'
                break;
            case 4:
                weekStr = '星期五'
                break;
            case 5:
                weekStr = '星期六'
                break;
            case 6:
                weekStr = '星期日'
                break;
            default:
                break;
        }

        return weekStr
    }

    return (
        <PageLayout>
            <div className="bill-list-container">
                {list?.map(item => {
                    return (
                        <div className="bill-list-item">
                            <div className="bill-list-item-top">
                                <div>
                                    <Space>
                                        <span>{getDay(item.time)}</span>
                                        <span>{getWeek(item.time)}</span>
                                    </Space>
                                </div>
                                <div>
                                    支出：{item.money}
                                </div>
                            </div>
                            <div className="bill-list-item-body">
                                <div className="bill-list-item-icon">
                                    <div className={classNames('icon-item')} onClick={() => add(item)}>
                                        <MyIcon type={item.code} fontSize={24} />
                                    </div>
                                    {item.name}
                                </div>
                                <div>
                                    {item.money}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </PageLayout>
        // <>
        //     <NavigateBar backArrow={false}>首页</NavigateBar>
        //     <div className="bill-list-container">
        //         {list?.map(item => {
        //             return (
        //                 <div className="bill-list-item">
        //                     <div className="bill-list-item-top">
        //                         <div>
        //                             <Space>
        //                                 <span>{getDay(item.time)}</span>
        //                                 <span>{getWeek(item.time)}</span>
        //                             </Space>
        //                         </div>
        //                         <div>
        //                             支出：{item.money}
        //                         </div>
        //                     </div>
        //                     <div className="bill-list-item-body">
        //                         <div className="bill-list-item-icon">
        //                             <div className={classNames('icon-item')} onClick={() => add(item)}>
        //                                 <MyIcon type={item.code} fontSize={24} />
        //                             </div>
        //                             {item.name}
        //                         </div>
        //                         <div>
        //                             {item.money}
        //                         </div>
        //                     </div>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </>
    )
}