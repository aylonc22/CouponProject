import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import { CustomSelect } from '../../../Select/CustomSelect';
import './AddCompany.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { Company } from '../../../../model/Company';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';


export function AddCompany():JSX.Element{
    useAuthRedirect();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Company>();
    const onSubmit: SubmitHandler<Company> = (Company) => {               
        axiosJWT.post("http://localhost:8080/api/v1/user/login",Company).then(res=>{
            notify.success(`WELCOME!`)                       
           
            navigate(`/`);
        }).catch((err:AxiosError)=>notify.error(axiosErrHandler(err)));
    }
    return (<div className="Add">        
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                      
                    <CustomInput register={register} name="userName" label="Company Name"/>
                    <CustomInput register={register} name="email" label="Email"/>
                    <CustomInput register={register} name="password" label="Password"/>
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Sign up" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}