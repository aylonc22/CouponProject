import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './AddCustomer.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { Customer } from '../../../../model/Customer';


export function AddCustomer():JSX.Element{
    useAuthRedirect("","Customer");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();
    const onSubmit: SubmitHandler<Customer> = (Customer) => {               
        axiosJWT.post("http://localhost:8080/api/v1/admin/customer",Customer).then(res=>{
            notify.success(`Customer added successfully!`)                                           
        }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined);
    }
    return (<div className="Add">   
            <h1 style={{paddingTop:"5%"}}>Add Customer</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomInput type ='text' register={register} name="first_name" label="First Name"/>
                    <CustomInput type ='text' register={register} name="last_name" label="Last Name"/>
                    <CustomInput type ='text' register={register} name="email" label="Email"/>
                    <CustomInput type ='password' register={register} name="password" label="Password"/>
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Create" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}