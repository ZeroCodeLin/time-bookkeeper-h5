import React, { useEffect, useState } from "react";
import { Grid, NumberKeyboard, Toast } from 'antd-mobile'
import classNames from "classnames";
import { MyIcon, NavigateBar, PageLayout } from '../../component'
import { getIconList } from "../../services/icons";

import './index.scss'
import { NumberKeyBoard } from "./component";
import { createBill } from "../../services";
import { useNavigate } from "react-router";

export const Add = props => {
    const [iconList, setIconList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const navigator = useNavigate()

    useEffect(() => {
        getIcons()
    }, [])

    const getIcons = () => {
        getIconList().then(res => {
            setIconList(res.data);
        })
    }

    const add = (item) => {
        setVisible(true)
        setSelectedItem(item)
    }

    const addItem = (obj) => {
        const params = {
            ...obj,
            money: Number(obj.money),
            type: 1,
            iconId: selectedItem.id
        }
        console.log(params)
        createBill(params).then(res => {
            setVisible(false);
            Toast.show({
                icon: 'success',
                content: '保存成功',
            })
            navigator('/home')
        })
    }

    return (
        <PageLayout>
            <div style={{ padding: "10px" }}>
                <Grid columns={4} gap={8}>
                    {iconList?.map((item, index) => (
                        <Grid.Item className="icon-container">
                            <div className={classNames({ 'active': selectedItem?.name === item.name }, 'icon-item')} onClick={() => add(item)}>
                                <MyIcon type={item.code} fontSize={24} />
                            </div>
                        </Grid.Item>
                    ))}
                </Grid>
            </div>
            <NumberKeyBoard visible={visible} onOk={addItem} />
            {/* <NumberKeyboard
                visible={visible}
                // onClose={actions.onClose}
                // onInput={actions.onInput}
                // onDelete={actions.onDelete}
                title='数字键盘'
                customKey='-'
            /> */}
        </PageLayout>
    )
}