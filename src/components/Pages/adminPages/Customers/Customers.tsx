import './Customers.css';

import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { couponSystem } from '../../../../redux/store';
import { AdminCustomTable } from '../../../AdminCustomTable/AdminCustomTable';
import { useEffect } from 'react';
import axiosJWT from '../../../../util/axiosJWT';
import { createCustomerState } from '../../../../redux/adminReducer';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { useNavigate } from 'react-router-dom';


export function Customers():JSX.Element{
    useAuthRedirect();    
    const navigate = useNavigate();
    useEffect(()=>{
        axiosJWT.get('http://localhost:8080/api/v1/admin/customer').then(res=>{
            couponSystem.dispatch(createCustomerState(res.data));
        }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined);
    })  
    return <div>
        <AdminCustomTable type='Customer' />
    </div>
}