

import  'chart.js/auto';
import './Dashboard.css';
import { Doughnut, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Coupon } from '../../../../../../model/Coupon';
import axiosJWT from '../../../../../../util/axiosJWT';
import { useAuthRedirect } from '../../../../../../hooks/useAuthRedirect';
import { couponSystem } from '../../../../../../redux/store';
import { Categories } from '../../../../../../model/Categories';
import { CustomDoughunt } from '../../../../../Doughnut/Doughnut';
import { CouponsByMonth } from '../../../../../../model/CouponsByMonth';
export function Dashboard():JSX.Element{
    useAuthRedirect();
    couponSystem.subscribe(()=>{
        setCoupons(couponSystem.getState().myCoupons.myCoupons);
    })
    const [coupons,setCoupons] = useState<Coupon[]>();
    const [categories,setCategories] = useState<Categories>();   
    const [byDate,setByDate] = useState<CouponsByMonth>();
    function handleCategories(Coupons:Coupon[]){               
         let res:Categories = {Food:[],Electricity:[],Restaurant:[],Vacation:[],Healthcare:[],Gaming:[]};       
            Coupons.forEach(coupon=>{
               switch (coupon.category) {
                case 'Food':
                    res.Food.push(coupon);
                    break;
                case 'Electricity':
                    res.Electricity.push(coupon);
                    break;                
                case 'Restaurant':
                    res.Restaurant.push(coupon);
                    break;
                case 'Vacation':
                    res.Vacation.push(coupon);
                    break;
                case 'Healthcare':
                    res.Healthcare.push(coupon);
                    break;
                case 'Gaming':
                    res.Gaming.push(coupon);
                    break;
               }
            });
            setCategories(res);
    }
    function handleByDate(Coupons:Coupon[]){
        let res:CouponsByMonth = {January:[],February:[],March:[],April:[],May:[],June:[],
            July:[],August:[],September:[],October:[],November:[],December:[],
        };       
        Coupons.forEach(coupon=>{
           switch (new Date(coupon.end_date).getMonth()) {
            case 0:
                res.January.push(coupon);
                break;
            case 1:
                res.February.push(coupon);
                break;                
            case 2:
                res.March.push(coupon);
                break;
            case 3:
                res.April.push(coupon);
                break;
            case 4:
                res.May.push(coupon);
                break;
            case 5:
                res.June.push(coupon);
                break;
            case 6:
                res.July.push(coupon);
                break;
            case 7:
                res.August.push(coupon);
                break;                
            case 8:
                res.September.push(coupon);
                break;
            case 9:
                res.October.push(coupon);
                break;
            case 10:
                res.November.push(coupon);
                break;
            case 11:
                res.December.push(coupon);
                break;
           }
        });
        setByDate(res);
    }
    useEffect(()=>{              
        const newCoupons:Coupon[] = couponSystem.getState().myCoupons.myCoupons;
        handleCategories(newCoupons);
        handleByDate(newCoupons);
    }
        ,[coupons]);   
    const totalCoupons = [
        categories?.Food.length?categories.Food.length:0,
        categories?.Electricity.length?categories.Electricity.length:0,
        categories?.Restaurant.length?categories.Restaurant.length:0,
        categories?.Vacation.length?categories.Vacation.length:0,
        categories?.Healthcare.length?categories.Healthcare.length:0,
        categories?.Gaming.length?categories.Gaming.length:0
    ]  
    const totalCouponsByMonth = [
        byDate?.January.length?byDate.January.length:0,
        byDate?.February.length?byDate.February.length:0,
        byDate?.March.length?byDate.March.length:0,
        byDate?.April.length?byDate.April.length:0,
        byDate?.May.length?byDate.May.length:0,
        byDate?.June.length?byDate.June.length:0,
        byDate?.July.length?byDate.July.length:0,
        byDate?.August.length?byDate.August.length:0,
        byDate?.September.length?byDate.September.length:0,
        byDate?.October.length?byDate.October.length:0,
        byDate?.November.length?byDate.November.length:0,
        byDate?.December.length?byDate.December.length:0,
    ]
   return (<div >
    <div className='Doughunts'>
        <CustomDoughunt numbers={totalCoupons} label='Total Coupons Available'/>       
    </div>
    <div className='LineChart'>
    <Line data={{labels: ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'End this Month',
        data: totalCouponsByMonth,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],}}/>
    </div>
    </div>);
}