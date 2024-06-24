import { useNavigate, useParams } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './EditCustomer.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import { Customer } from '../../../../model/Customer';

interface customerEdit{
    customerID:number;
    first_name:string;
    last_name:string;
    email:string;
}
export function EditCustomer():JSX.Element{
    useAuthRedirect("","Customer");
    const params = useParams();
    const customer:customerEdit = JSON.parse(params.customer as string);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();
    const onSubmit: SubmitHandler<Customer> = (Customer) => {         
        Customer.customerID = customer.customerID;
        axiosJWT.put("http://localhost:8080/api/v1/admin/customer/update",Customer).then(res=>{
            notify.success(`Customer edit successfully!`)    
            navigate('/customer');
        }).catch((e:AxiosError)=>axiosErrHandler(e)=='Unauthorized'?navigate('/login'):undefined);
    }
    return (<div className="Add">   
            <h1 style={{paddingTop:"5%"}}>Edit Customer</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomInput defaultValue={customer.first_name} type ='text' register={register} name="first_name" label="First Name"/>
                    <CustomInput defaultValue={customer.last_name} type ='text' register={register} name="last_name" label="Last Name"/>
                    <CustomInput defaultValue={customer.email} type ='text' register={register} name="email" label="Email"/>                   
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Edit" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}