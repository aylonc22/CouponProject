import { PanelRoute } from '../../../../Routes/PanelRoute/PanelRoute';
import { useAuthRedirect } from '../../../../hooks/useAuthRedirect';
import './CompanyProfile.css';
import { Panel } from './Panel/Panel';

export function CompanyProfile():JSX.Element{ 
    useAuthRedirect();
    return (<div className='CompanyProfile'>
       <Panel/>
      <PanelRoute/>
    </div>)
}