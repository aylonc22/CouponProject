import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../components/Pages/CustomerPages/Profile/Data/Dashboard/Dashboard";
import { CustomerCoupons } from "../../components/Pages/CustomerPages/Profile/Data/Coupons/CustomerCoupons";

export function CustomerPanelRoute(): JSX.Element {  
    return (
        <div className="PanelRoute">
		<Routes>
                <Route path={'/*'} element={<Dashboard/>}/>                    
                <Route path={`/coupons`} element={<CustomerCoupons/>} />
        </Routes>
        </div>
    );
}