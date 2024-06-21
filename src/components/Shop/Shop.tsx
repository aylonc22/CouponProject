import { useEffect, useState } from 'react';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { CouponCard } from '../CouponCard/CouponCard';
import './Shop.css';
import { Coupon } from '../../model/Coupon';
import axiosJWT from '../../util/axiosJWT';
import axios, { AxiosError } from 'axios';
import { axiosErrHandler } from '../../util/axiosErr';
import { useNavigate } from 'react-router-dom';
import { couponSystem } from '../../redux/store';
import { createCouponState } from '../../redux/couponsReducer';

export function Shop():JSX.Element{
    const navigate = useNavigate();
    useAuthRedirect('Shop');
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
            if(couponSystem.getState().auth.userType === 'guest'){
                axios.get('http://localhost:8080/api/v1/guest/coupons').then(res=>{               
                    setCoupons(res.data);           
                    couponSystem.dispatch(createCouponState(res.data));           
                }).catch((e:AxiosError)=>axiosErrHandler(e));
            }
       else{     axiosJWT.get('http://localhost:8080/api/v1/customer/coupons').then(res=>{               
            setCoupons(res.data);           
            couponSystem.dispatch(createCouponState(res.data));           
        })
        .catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined)}}
    },[navigate]);
    return <div className='Cards'>{coupons?.map(coupon=><CouponCard key={coupon.couponID} coupon={coupon}/>)}</div>
}