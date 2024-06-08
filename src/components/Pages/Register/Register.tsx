import './Register.css';
import lock from '../../../assets/images/lock.svg';
import { UserDetails } from '../../../model/UserDetails';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CustomInput} from '../../Input/CustomInput';
import { CustomSelect } from '../../Select/CustomSelect';
import notify from '../../../util/notif';
import { axiosErrHandler } from '../../../util/axiosErr';
export function Register():JSX.Element{
   const navigate = useNavigate();
   const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const [userType,setUserType] = useState("Customer");
    const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();
    const onSubmit: SubmitHandler<UserDetails> = (data) => {  
        if(!emailRegex.test(data.email)){
            notify.error("Email doesn't have valid pattern!");
            return;
        }   
        const newUser = {
            userName: userType == "Customer"? `${data.firstName}_${data.lastName}`:data.userName,
            email: data.email,
            password:data.password,
            userType:data.userType.toUpperCase()
        }  
        console.log(newUser);
                      
        axios.post("http://localhost:8080/api/v1/user/register",newUser).then(res=>{
            notify.success(`${userType=="Customer"? `${data.firstName} ${data.lastName}`:data.userName} WELCOME!`)
            navigate(`/Login`);
        }).catch((err:AxiosError)=>notify.error(axiosErrHandler(err)));
    }
    return (<div className="Register">
        <div className="LockContainer"> <img className='Lock' src={lock}/></div>
        <h2>Welcome aboard!</h2>
        
        <form  onSubmit={handleSubmit(onSubmit)}>                                                          
                    <CustomSelect register={register} name="userType" onValueChange={setUserType} options={["Customer","Company"]} />
                    <CustomInput register={register} name={userType=="Customer"?"firstName":"userName"} label={userType=="Customer"?"First Name":"Company Name"}/>
                    {userType=="Customer" && <CustomInput register={register} name="lastName" label="Last Name"/>}
                    <CustomInput register={register} name="email" label="Email"/>
                    <CustomInput register={register} name="password" label="Password"/>
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Sign up" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)
}