import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../../../../hooks/useAuthRedirect';
import { couponSystem } from '../../../../../redux/store';
import './Panel.css';
import { useEffect, useState } from 'react';
import { Coupon } from '../../../../../model/Coupon';
import axiosJWT from '../../../../../util/axiosJWT';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../../util/axiosErr';
import { authState } from '../../../../../redux/authReducer';
import profileIcon from '../../../../../assets/images/profileIcon.jpg';
import { createCompanyState } from '../../../../../redux/companyReducer';

export function Panel():JSX.Element{
    useAuthRedirect();   
    const navigate = useNavigate() ;
    const [coupons,setCoupons] = useState<Coupon[]>([]);    
    couponSystem.subscribe(()=>{
        setCoupons(couponSystem.getState().company.coupons);
    })
    useEffect(()=>{
                if(couponSystem.getState().company.coupons.length>0){
                    setCoupons(couponSystem.getState().company.coupons);
                }
                else{
                        axiosJWT.get(`http://localhost:8080/api/v1/company/allCoupons/${couponSystem.getState().auth.userId}`).then(res=>{
                    const data = res.data;
                    couponSystem.dispatch(createCompanyState(data));                   
                }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined);
            }
            
    },[]);
    return (<div className="container">
       <label style={{fontSize:"30px",paddingBottom:"15px"}}> Company</label>
        <div className="card">
          <img src={profileIcon} alt="Person" className="card__image"/>
          <p className="card__name">{couponSystem.getState().auth.email}<br/></p>
          <div className="grid-container">      
            <div className="grid-child-posts">
            {couponSystem.getState().auth.name}
            </div>      
            <div className="grid-child-followers">
             {coupons.length + " Coupons"}
            </div>      
          </div>          
          <NavLink className="btn draw-border" to={'/company/details'}>Dashboard</NavLink>
          <NavLink className="btn draw-border" to={'/company/details/coupons'}>My Coupons</NavLink>          
      
        </div>              
      </div>
      );    
}