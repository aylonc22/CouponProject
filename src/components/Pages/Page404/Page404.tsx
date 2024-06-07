import { useEffect } from 'react';
import './Page404.css';
import { logic } from './Page404Logic';
import { NavLink } from "react-router-dom";

export function Page404(): JSX.Element {
    useEffect(()=>{logic()},[]);
    return (
        <>
        <script >alert("hey")</script>
         <div className="Page404">
             <div className="Square404" id="Square">
            <div className="Square">
            <h1>404</h1>
            </div>
        </div>
            <div className="texts">
                <h4>Oops! page not found</h4>
                <p>The page you are looking for does not exist. Go back to the main page or search.</p>
                <NavLink to="/" className="btn">Back to Home</NavLink>
            </div>
        </div>
        </>
    )
}