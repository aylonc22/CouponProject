import { CustomerPanelRoute } from '../../../../Routes/CustomerPanelRoute/CustomerPanelRoute';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import './CustomerProfile.css';
import { Panel } from './Panel/Panel';

export function CustomerProfile():JSX.Element{ 
    useAuthRedirect("","Customer");
    return (<div className='CompanyProfile'>
       <Panel/>
      <CustomerPanelRoute/>
    </div>)
}