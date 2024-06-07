import "./Header.css";
import profile from '../../../assets/images/profile.svg';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponSystem } from "../../../redux/store";
import { logoutAction } from "../../../redux/authReducer";
export function Header(): JSX.Element {
    const navigate = useNavigate();
    const [visible,setVisible] = useState<Boolean>(false);
    const [isLogged,setLogged] = useState<Boolean>(false);
    const handleLogin=():void=>{
        if(isLogged){
            couponSystem.dispatch(logoutAction());
            navigate("/loging");
        }
        else{
            navigate("/login");
        }
    }
    couponSystem.subscribe(()=>{
        setLogged(couponSystem.getState().auth.isLogged);   
        console.log(couponSystem.getState().auth.token);
    });   
    return (
    <div className="Header">
    <div className="Left">
       <div className="Contact">
        <div className="Highlight">Email:</div>
        <div className="Email">aylonc1@gmail.com</div>
       </div>
       <div className="Today">
        <div>|</div>
        <div className="Discount">
        <div>Today's: </div>
        <div className="Highlight"> Discount 40% OFF</div>
        </div>
       </div>
    </div>
    <div className="Right">
        <div className="Profile">
        <div className={visible?"Options":"OptionsHide"}>
        <div onClick={()=>handleLogin()} className="ProfileButton">{isLogged?"logout":"login"}</div>
        {!isLogged && <div className="ProfileButton" onClick={()=>navigate("/register")}>register</div>}
        </div>
        <img  onClick={()=>setVisible(!visible)} src={profile} />
        </div>
    </div>
    </div>)
}