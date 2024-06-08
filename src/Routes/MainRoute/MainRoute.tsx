import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Main } from "../../components/Layouts/Main/Main";
import { Page404 } from "../../components/Pages/Page404/Page404";
import { Register } from "../../components/Pages/Register/Register";
import { Login } from "../../components/Pages/Login/Login";
import { AddCompany } from "../../components/Pages/adminPages/AddCompany/AddCompany";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<Main/>}/>                  
                <Route path="/company/add" element={<AddCompany/>} />                  
                <Route path="/customer/add" />                  
                <Route path="/company"/>                  
                <Route path="/customer"/>                  
                <Route path="/register" element={<Register/>}/>           
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Page404/>}/>   
            </Routes>
        </div>
    );
}