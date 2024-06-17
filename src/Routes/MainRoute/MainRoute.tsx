import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Main } from "../../components/Layouts/Main/Main";
import { Page404 } from "../../components/Pages/Page404/Page404";
import { Register } from "../../components/Pages/Register/Register";
import { Login } from "../../components/Pages/Login/Login";
import { AddCompany } from "../../components/Pages/AdminPages/AddCompany/AddCompany";
import { AddCustomer } from "../../components/Pages/AdminPages/AddCustomer/AddCustomer";
import { AddCoupon } from "../../components/Pages/CompanyPages/AddCoupon/AddCoupon";
import { CompanyProfile } from "../../components/Pages/CompanyPages/Profile/CompanyProfile";
import { EditCoupon } from "../../components/Pages/CompanyPages/EditCoupon/EditCoupon";
import { Shop } from "../../components/Shop/Shop";
import { CustomerProfile } from "../../components/Pages/CustomerPages/Profile/CustomerProfile";
import { Companies } from "../../components/Pages/AdminPages/Companies/Companies";
import { Customers } from "../../components/Pages/AdminPages/Customers/Customers";
import { EditCompany } from "../../components/Pages/AdminPages/EditCompany/EditCompany";
import { EditCustomer } from "../../components/Pages/AdminPages/EditCustomer/EditCustomer";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<Main/>}/>                  
                <Route path="/company/add" element={<AddCompany/>} />                  
                <Route path="/company/edit/:company" element={<EditCompany/>} />                  
                <Route path="/company/addCoupon" element={<AddCoupon/>}/>  
                <Route path="/company/editCoupon/:coupon" element={<EditCoupon/>}/>                  
                <Route path="/company/details/*" element={<CompanyProfile/>}/>                  
                <Route path="/customer/details/*" element={<CustomerProfile/>}/>                  
                <Route path="/customer/add" element={<AddCustomer/>}/> 
                <Route path="/customer/edit/:customer" element={<EditCustomer/>} />                   
                <Route path="/coupons" element={<Shop/>}/>                  
                <Route path="/company" element={<Companies/>}/>                  
                <Route path="/customer" element={<Customers/>}/>                  
                <Route path="/register" element={<Register/>}/>           
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Page404/>}/>   
            </Routes>
        </div>
    );
}