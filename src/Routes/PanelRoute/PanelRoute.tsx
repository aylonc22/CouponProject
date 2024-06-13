import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../components/Pages/CompanyPages/Profile/Data/Dashboard/Dashboard";
import { CompanyCoupons } from "../../components/Pages/CompanyPages/Profile/Data/Coupons/CompanyCoupons";

export function PanelRoute(): JSX.Element {  
    return (
        <div className="PanelRoute">
		<Routes>
                <Route path={'/*'} element={<Dashboard/>}/>                    
                <Route path={`/coupons`} element={<CompanyCoupons/>} />
        </Routes>
        </div>
    );
}