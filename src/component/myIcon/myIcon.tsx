import React from "react";
import classnames from 'classnames'
import '../../iconfont/iconfont.css'

export const MyIcon = props => {
    const { type, fontSize } = props;
    return (
        <i
            className={classnames('iconfont', `icon-zero-${type}`)}
            style={{ fontSize: fontSize }}></i>
    )
}