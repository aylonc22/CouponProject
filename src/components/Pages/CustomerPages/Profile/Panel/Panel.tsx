import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../../../../hooks/useAuthRedirect';
import { couponSystem } from '../../../../../redux/store';
import './Panel.css';
import { useEffect, useState } from 'react';
import { Coupon } from '../../../../../model/Coupon';
import axiosJWT from '../../../../../util/axiosJWT';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../../util/axiosErr';
import profileIcon from '../../../../../assets/images/profileIcon.jpg';
import { createMyCouponState } from '../../../../../redux/myCouponsReducer';

export function Panel():JSX.Element{
    useAuthRedirect();   
    const navigate = useNavigate() ;
    const [coupons,setCoupons] = useState<Coupon[]>([]);     
    couponSystem.subscribe(()=>{
        setCoupons(couponSystem.getState().myCoupons.myCoupons);
    })
    useEffect(()=>{
                if(couponSystem.getState().myCoupons.myCoupons.length>0){
                    setCoupons(couponSystem.getState().myCoupons.myCoupons);
                }
                else{                 
                        axiosJWT.get(`http://localhost:8080/api/v1/customer/coupons/${couponSystem.getState().auth.userId}`).then(res=>{
                    const data = res.data;
                   
                    couponSystem.dispatch(createMyCouponState(data));                   
                }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined);
            }
            
    },[]);
    const name = couponSystem.getState().auth.name.split('_')[0] + " " + couponSystem.getState().auth.name.split('_')[1];
    return (<div className="container">
       <label style={{fontSize:"30px",paddingBottom:"15px"}}> Customer</label>
        <div className="card">
          <img src={profileIcon} alt="Person" className="card__image"/>
          <p className="card__name">{couponSystem.getState().auth.email}<br/></p>
          <div className="grid-container">      
            <div className="grid-child-posts">
            {name}
            </div>      
            <div className="grid-child-followers">
             {coupons.length + " Coupons"}
            </div>      
          </div>          
          <NavLink className="btn draw-border" to={'/customer/details'}>Dashboard</NavLink>
          <NavLink className="btn draw-border" to={'/customer/details/coupons'}>My Coupons</NavLink>          
      
        </div>              
      </div>
      );    
}