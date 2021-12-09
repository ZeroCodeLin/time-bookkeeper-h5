import React, { useMemo, useState } from "react";
import { Input, Popup, List, SafeArea, DatePicker } from "antd-mobile";
import dayjs from "dayjs";

import './index.scss';
import { unstable_batchedUpdates } from "react-dom";
import { Picker } from "antd-mobile/es/components/picker/picker";


const today = dayjs().startOf('day').valueOf();
const now = new Date();

export const NumberKeyBoard = props => {
    const { visible, onOk } = props;
    const [time, setTime] = useState(today)
    const [value, setValue] = useState('0.00');
    const [remark, setRemark] = useState();
    const [flag, setFlag] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const keys = useMemo(() => {
        const defaultKeys = [
            '7', '8', '9', 'date', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', 'X', 'OK'
        ]
        return defaultKeys
    }, [])

    // 点击键盘按键
    const onKeyPress = (key: string) => {
        switch (key) {
            case 'X':
                // onDelete?.()
                if (value != '0') {
                    const str = value.substring(0, value.length - 1)
                    setValue(str)
                }
                break
            case 'OK':
                if (flag) {
                    const sum = eval(value)
                    setValue(sum)
                    return
                }
                conform()
                break
            case 'date':
                setPickerVisible(true)
                break
            case '+':
            case '-':
                unstable_batchedUpdates(() => {
                    setFlag(true);
                    setValue(value + key)
                })
                break
            default:
                debugger
                if (Number(value) === 0) {
                    setValue(key)
                    return
                }
                setValue(value + key)
                break
        }
    }

    const selectPicker = (time: Date) => {
        const selectDay = dayjs(time).startOf('day').valueOf()
        setTime(selectDay)
        setPickerVisible(false)
    }

    const remarkChange = (val) => {
        setRemark(val)
    }

    const getKey = (flag: string) => {
        switch (flag) {
            case 'date':
                return time === today ? '今天' : dayjs(time).format('YYYY/MM/DD');
            default:
                return flag
        }
    }

    const conform = () => {
        const params = {
            money: value,
            remark: remark,
            time: time
        }
        onOk(params)
        console.log(params)
    }

    return (
        <Popup
            visible={visible}
            mask={false}
            bodyClassName="numberkey-board-container"
        >
            <div className="numberkey-board-top">
                <div className="numberkey-board-title">
                    备注：
                </div>
                <div className="numberkey-board-input">
                    <Input onChange={remarkChange} />
                </div>
                <div className="numberkey-board-money">
                    {value}
                </div>
            </div>
            <div className="numberkey-board">
                {
                    keys.map(item => {
                        return (
                            <div
                                className="numberkey-board-item"
                                key={item}
                                onClick={() => onKeyPress(item)}>
                                {getKey(item)}
                            </div>
                        )
                    })
                }
            </div>

            <DatePicker
                visible={pickerVisible}
                onClose={() => {

                }}
                defaultValue={now}
                max={now}
                onConfirm={selectPicker} />
            <SafeArea position='bottom' />
        </Popup>
    )
}