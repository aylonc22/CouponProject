import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Main } from "../../components/Layouts/Main/Main";
import { Page404 } from "../../components/Pages/Page404/Page404";
import { Register } from "../../components/Pages/Register/Register";
import { Login } from "../../components/Pages/Login/Login";

export function MainRoute(): JSX.Element {
    //to use react routes => npm install react-router-dom
    return (
        <div className="MainRoute">
			<Routes>
                <Route path="/" element={<Main/>}/>                  
                <Route path="*" element={<Page404/>}/>   
                <Route path="/register" element={<Register/>}/>           
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}