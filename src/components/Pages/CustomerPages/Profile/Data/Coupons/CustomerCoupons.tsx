import CustomTable from '../../../../../CustomTable/CustomTable';
import './Coupons.css';


export function CustomerCoupons():JSX.Element{
    return (
       <div className='CompanyCoupons'>
        <div className='Container'><CustomTable/></div>
       </div>
      );
}