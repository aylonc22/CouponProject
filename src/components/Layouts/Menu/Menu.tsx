import { useState } from "react";
import "./Menu.css";
import { NavLink, useNavigate } from "react-router-dom";
import { couponSystem } from "../../../redux/store";
import coupon from '../../../assets/images/coupon.svg';
export function Menu(): JSX.Element {   
    const [menuType,setMenuType]=useState("guest");
    const navigate = useNavigate();
    const guestMenu = <div className="Right">
         <NavLink className="MenuLink" to='/'>Home</NavLink>         
    </div>
    const adminMenu =(<div className="Right">            
            <div className="Pop">
                <label>add</label>
                <NavLink className="MenuLink" to='/company/add'>Company</NavLink>
            </div>
            <div className="Pop">
            <label>add</label>
            <NavLink className="MenuLink" to='/customer/add'>Customer</NavLink>
            </div>
            <NavLink className="MenuLink" to='/company'>Companies</NavLink>
            <NavLink className="MenuLink" to='/customer'>Customers</NavLink>        
        </div>);
    const companyMenu =(<div className="Right">
             <NavLink className="MenuLink" to='/'>Home</NavLink>           
            <div className="Pop">
                <label>add</label>
            <NavLink className="MenuLink" to='/company/addCoupon'>Coupon</NavLink> 
            </div>  
            <NavLink className="MenuLink" to='/company/details'>Profile</NavLink>        
        </div>);
    const customerMenu =(<div className="Right">
            <NavLink className="MenuLink" to='/'>Home</NavLink>           
            <div className="Pop">
            <label>buy</label>
            <NavLink className="MenuLink" to='/coupons'>Shop</NavLink> 
            </div>  
            <NavLink className="MenuLink" to='/customer/details'>Profile</NavLink>        
    </div>);
    const handleMenu = ()=>{
        switch (menuType) {
            case 'ADMIN':
                return adminMenu;               
            case 'COMPANY':
                return companyMenu;
            case 'CUSTOMER':
                return customerMenu;
            default:
                return guestMenu;               
        }
    }
    couponSystem.subscribe(()=>{
        setMenuType(couponSystem.getState().auth.userType);
    });   
    return (<div className="Menu">        
       
        <div className="Left">            
        <img className="CouponIcon" src={coupon} onClick={()=>navigate('/')}/>
        <div className="CouponLabel" onClick={()=>navigate('/')}>Coupons</div>
        </div>        
        {handleMenu()}
        <div className="Slogan">"Save Big, Shop Smart: Your Ultimate Coupon Destination!"</div>
       
    </div>)
}