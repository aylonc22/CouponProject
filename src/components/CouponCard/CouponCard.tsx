import { AxiosError } from 'axios';
import { Coupon } from '../../model/Coupon';
import { couponSystem } from '../../redux/store';
import axiosJWT from '../../util/axiosJWT';
import notify from '../../util/notif';
import './CouponCard.css';
import { axiosErrHandler } from '../../util/axiosErr';
import { useNavigate } from 'react-router-dom';
import { createCouponState } from '../../redux/couponsReducer';
import { useState } from 'react';
interface CardProps{
    coupon:Coupon;
}
export function CouponCard(coupon:CardProps):JSX.Element{
    const navigate = useNavigate();
    const cardCoupon = coupon.coupon;
    const [amount,setAmount] = useState(cardCoupon.amount);
    const handleBuy = ()=>{
       if(couponSystem.getState().auth.userType === 'guest')
        {
            notify.error('In order to buy you need to login')
            navigate('/login')
            return;
        }
        if(cardCoupon.amount===0){
            notify.error('You cannot buy this coupon');
            return;
        }
        axiosJWT.post(`http://localhost:8080/api/v1/customer/buyCoupon/${cardCoupon.couponID}/${couponSystem.getState().auth.userId}`).then(res=>{
            notify.success('Coupon Bought')
            let newCoupons = couponSystem.getState().coupons.coupons;
            newCoupons.forEach(c=>{
                if(c.couponID===cardCoupon.couponID){  
                    c.amount--;
                    setAmount(c.amount);
            }
            })
            couponSystem.dispatch(createCouponState(newCoupons));
        })
        .catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined)
    }
    return(<div className='CardContainer'>
       
       <div className='ImageContainer'>
       <div className='PopShop'>New</div>
        <img style={{width:'100%',height:'60%'}} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' ; }}
        src={cardCoupon.image} alt='Coupon'/>
       </div>
       <div className='CardDetails'>
            <div>Title: {cardCoupon.title}</div>
            <div>{cardCoupon.description}</div>
            <div>{`Untill: ${cardCoupon.end_date}`}</div>
            <div>Price:{cardCoupon.price}$</div>
            <div>{amount} Left!!</div>
       </div>
       <div className='Buy'><label onClick={()=>handleBuy()} className='BuyButton'>Buy</label></div>
    </div>)
}