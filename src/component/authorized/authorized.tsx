import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getPerm } from '../../services/perm';
import { HelpUtils } from '../../utils/utils';

export const Authorized: React.FC<any> = props => {
    const { authCode, Component } = props;
    const [perm, setPerm] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        debugger
        getPermInfo()
    }, [])

    useEffect(() => {
        console.log(isAuth)
    }, [isAuth])

    const getPermInfo = () => {
        const perm = sessionStorage.getItem('perm');
        if (perm) {
            // setPerm(JSON.parse(perm));
            setIsAuth(isPerm(JSON.parse(perm)))
            return
        }

        getPerm().then(res => {
            // setPerm(res.data);
            sessionStorage.setItem('perm', JSON.stringify(res.data));
            setIsAuth(isPerm(res.data))
        })
    }

    const isPerm = (perm: any) => {
        let isAuth = false;
        for (const item of perm) {
            if (item?.children) {
                isAuth = isPerm(item.children)
            }
            if (item.code === authCode || isAuth) {
                return true
            }
        }
        return false;
    }

    return (
        <>
            {isAuth}
            {isAuth ? <Component /> : null}
        </>
    )
}