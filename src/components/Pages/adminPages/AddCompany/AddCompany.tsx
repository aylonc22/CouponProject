import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './AddCompany.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { Company } from '../../../../model/Company';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';


export function AddCompany():JSX.Element{
    useAuthRedirect("","Company");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Company>();
    const onSubmit: SubmitHandler<Company> = (Company) => {               
        axiosJWT.post("http://localhost:8080/api/v1/admin/company",Company).then(res=>{
            notify.success(`Company added successfully!`)                                           
        }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined);
    }
    return (<div className="Add">   
            <h1 style={{paddingTop:"5%"}}>Add Company</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomInput type ='text' register={register} name="name" label="Company Name"/>
                    <CustomInput type ='text' register={register} name="email" label="Email"/>
                    <CustomInput type ='password' register={register} name="password" label="Password"/>
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Create" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}