import { AxiosError } from 'axios';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { createCompanyState } from '../../../../redux/adminReducer';
import { couponSystem } from '../../../../redux/store';
import { AdminCustomTable } from '../../../AdminCustomTable/AdminCustomTable';
import './Companies.css';
import { useEffect } from 'react';
import { axiosErrHandler } from '../../../../util/axiosErr';
import axiosJWT from '../../../../util/axiosJWT';
import { useNavigate } from 'react-router-dom';

export function Companies():JSX.Element{
    useAuthRedirect("","Admin");      
    const navigate = useNavigate();
    useEffect(()=>{
        if(couponSystem.getState().auth.token.length>10)
        axiosJWT.get('http://localhost:8080/api/v1/admin/company').then(res=>{
            couponSystem.dispatch(createCompanyState(res.data));
        }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined);
    })  
    return <div>
        <AdminCustomTable type='Company' />
    </div>
}