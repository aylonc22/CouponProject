import { useNavigate, useParams } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './EditCoupon.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { Coupon } from '../../../../model/Coupon';
import { couponSystem } from '../../../../redux/store';
import { CustomSelect } from '../../../Select/CustomSelect';
import {createMyCouponState } from '../../../../redux/myCouponsReducer';


export function EditCoupon():JSX.Element{
    useAuthRedirect();
    const params = useParams();
    const coupon:Coupon = JSON.parse(params.coupon ? params.coupon : '');        
    const navigate = useNavigate();    
    const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();
    const onSubmit: SubmitHandler<Coupon> = (Coupon) => { 
        Coupon.companyID = couponSystem.getState().auth.userId
        Coupon.couponID = coupon.couponID;
        axiosJWT.put("http://localhost:8080/api/v1/company/coupon",Coupon).then(res=>{
           let newCoupons = couponSystem.getState().myCoupons.myCoupons.filter(coupon=>coupon.couponID!=Coupon.couponID);
           newCoupons.push(Coupon);
           couponSystem.dispatch(createMyCouponState(newCoupons));
            notify.success(`Coupon updated successfully!`)                                           
        }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined).finally(()=>navigate('/company/details/coupons'));
    }

    return (<div className="Add">   
            <h1 style={{paddingTop:"1%"}}>Add Coupon</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomSelect defaultValue={coupon.category} register={register} onValueChange={()=>null} name={'category'} options={['Food','Electricity','Restaurant','Vacation','Healthcare','Gaming']} />
                    <CustomInput defaultValue={coupon.title} type='text' register={register} name="title" label="Title"/>
                    <CustomInput defaultValue={coupon.description} type='text' register={register} name="description" label="description"/>
                    <CustomInput defaultValue={new Date(coupon.start_date).toISOString().slice(0,10)} type='date' register={register} name="start_date" label="Start"/>
                    <CustomInput defaultValue={new Date(coupon.end_date).toISOString().slice(0,10)} type='date' register={register} name="end_date" label="End"/>
                    <CustomInput defaultValue={coupon.amount} type='number' register={register} name="amount" label="Amount"/>
                    <CustomInput defaultValue={coupon.price} type='number' register={register} name="price" label="Price"/>
                    <CustomInput defaultValue={coupon.image} type='text' register={register} name="image" label="Image"/>
                    
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Edit" />
                    <div className='FormButton' onClick={()=>navigate("/company/details")}>exit</div>
                    </div>
                </form>
    </div>)

}