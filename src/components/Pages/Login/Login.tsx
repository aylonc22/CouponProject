import { SubmitHandler, useForm } from 'react-hook-form';
import './Login.css';
import { CustomInput } from '../../Input/CustomInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notify from '../../../util/notif';
import unlock from '../../../assets/images/unlock.svg'
import { CustomSelect } from '../../Select/CustomSelect';
import { Credentials } from '../../../model/Credentials';
import { couponSystem } from '../../../redux/store';
import { loginAction } from '../../../redux/authReducer';
import {axiosErrHandler } from '../../../util/axiosErr';
import axiosJWT from '../../../util/axiosJWT';
import { AxiosError } from 'axios';


export function Login():JSX.Element{
    const navigate = useNavigate();
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const [userType,setUserType] = useState("Customer");
    const { register, handleSubmit, formState: { errors } } = useForm<Credentials>();
    const onSubmit: SubmitHandler<Credentials> = (userCredential) => {  
        if(!emailRegex.test(userCredential.email)){
            notify.error("Email doesn't have valid pattern!");
            return;
        }
        userCredential.userType = userCredential.userType.toUpperCase();
        axiosJWT.post("http://localhost:8080/api/v1/user/login",userCredential).then(res=>{
            notify.success(`WELCOME!`)                       
            couponSystem.dispatch(loginAction({email:userCredential.email,
                name:res.data.userName,
                token:res.headers.authorization,
                id:res.data.id,             
                userType:userCredential.userType,
                isLogged:true}))
            navigate(`/`);
        }).catch((err:AxiosError)=>notify.error(axiosErrHandler(err)));
    }
    return (<div className="Register">
        <div className="LockContainer"> <img className='Lock' src={unlock}/></div>
        <h2>Welcome back!</h2>
        
        <form  onSubmit={handleSubmit(onSubmit)}>                                                          
                    <CustomSelect register={register} name="userType" onValueChange={setUserType} options={["Customer","Company","Admin"]} />
                    <CustomInput register={register} name="email" label="Email"/>                    
                    <CustomInput register={register} name="password" label="Password"/>                    
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="login" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)
    }