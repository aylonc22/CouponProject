import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './AddCoupon.css';
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, set, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { Coupon } from '../../../../model/Coupon';
import { couponSystem } from '../../../../redux/store';
import { CustomSelect } from '../../../Select/CustomSelect';
import { useState } from 'react';
import { addMyCouponStateAction } from '../../../../redux/myCouponsReducer';


export function AddCoupon():JSX.Element{
    useAuthRedirect();
    const navigate = useNavigate();    
    const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();
    const onSubmit: SubmitHandler<Coupon> = (Coupon) => { 
        Coupon.companyID = couponSystem.getState().auth.userId
        axiosJWT.post("http://localhost:8080/api/v1/company/coupon",Coupon).then(res=>{
            couponSystem.dispatch(addMyCouponStateAction(Coupon));
            notify.success(`Coupon added successfully!`)                                           
        }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined).finally(()=>navigate('/company/details'));
    }

    return (<div className="Add">   
            <h1 style={{paddingTop:"1%"}}>Add Coupon</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomSelect register={register} onValueChange={()=>null} name={'category'} options={['Food','Electricity','Restaurant','Vacation','Healthcare','Gaming']} />
                    <CustomInput type='text' register={register} name="title" label="Title"/>
                    <CustomInput type='text' register={register} name="description" label="description"/>
                    <CustomInput defaultValue={new Date().toISOString().slice(0,10)} type='date' register={register} name="start_date" label="Start"/>
                    <CustomInput defaultValue={new Date().toISOString().slice(0,10)} type='date' register={register} name="end_date" label="End"/>
                    <CustomInput type='number' register={register} name="amount" label="Amount"/>
                    <CustomInput type='number' register={register} name="price" label="Price"/>
                    <CustomInput type='text' register={register} name="image" label="Image"/>
                    
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Create" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}