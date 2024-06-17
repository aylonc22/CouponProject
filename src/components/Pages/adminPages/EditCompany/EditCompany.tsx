import { useNavigate, useParams } from 'react-router-dom';
import { CustomInput } from '../../../Input/CustomInput';
import './EditCompany.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notif';
import { AxiosError } from 'axios';
import { axiosErrHandler } from '../../../../util/axiosErr';
import { Company } from '../../../../model/Company';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';

interface companyEdit{
    id:number;
    name:string;
    email:string;
}
export function EditCompany():JSX.Element{
    useAuthRedirect();
    const params = useParams();    
    const company:companyEdit = JSON.parse(params.company as string);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Company>();
    const onSubmit: SubmitHandler<Company> = (Company) => {               
        Company.id = company.id;
        axiosJWT.put("http://localhost:8080/api/v1/admin/company/update",Company).then(res=>{
            notify.success(`Company edit successfully!`)   
            navigate('/company');                                      
        }).catch((e:AxiosError)=>axiosErrHandler(e)==='Unauthorized'?navigate('/login'):undefined);
    }
    return (<div className="Add">   
            <h1 style={{paddingTop:"5%"}}>Edit Company</h1>     
        <form  onSubmit={handleSubmit(onSubmit)}>                                                                                                          
                    <CustomInput defaultValue={company.name} type ='text' register={register} name="name" label="Company Name"/>
                    <CustomInput defaultValue={company.email} type ='text' register={register} name="email" label="Email"/>                   
                    <div className='FormFooter'>
                    <input className='FormButton' type="submit" value="Edit" />
                    <div className='FormButton' onClick={()=>navigate("/")}>exit</div>
                    </div>
                </form>
    </div>)

}