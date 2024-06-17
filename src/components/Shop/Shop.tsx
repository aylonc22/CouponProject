import { useEffect, useState } from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { CouponCard } from '../CouponCard/CouponCard';
import './Shop.css';
import { Coupon } from '../../model/Coupon';
import axiosJWT from '../../util/axiosJWT';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../util/axiosErr';
import { useNavigate } from 'react-router-dom';
import { couponSystem } from '../../redux/store';
import { createCouponState } from '../../redux/couponsReducer';

export function Shop():JSX.Element{
    const navigate = useNavigate();
    useAuthRedirect();
    const [coupons,setCoupons] = useState<Coupon[]>();
    couponSystem.subscribe(()=>{                   
        setCoupons(couponSystem.getState().coupons.coupons);
    });    
    useEffect(()=>{
       if(couponSystem.getState().coupons.coupons.length>0)
        {
                 setCoupons(couponSystem.getState().coupons.coupons);                               
        }
        else{
            axiosJWT.get('http://localhost:8080/api/v1/customer/coupons').then(res=>{               
            setCoupons(res.data);           
            couponSystem.dispatch(createCouponState(res.data));           
        })
        .catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined)}
    },[navigate]);
    return <div className='Cards'>{coupons?.map(coupon=><CouponCard coupon={coupon}/>)}</div>
}