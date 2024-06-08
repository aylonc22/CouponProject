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
    const [userType,setUserType] = useState<string>("");
    const [userName,setUserName] = useState<string>("");
    const handleLogin=():void=>{
        if(isLogged){
            sessionStorage.removeItem("jwt");          
            couponSystem.dispatch(logoutAction());
            navigate("/login");
        }
        else{
            navigate("/login");
        }
    }
    couponSystem.subscribe(()=>{
        setLogged(couponSystem.getState().auth.isLogged);   
        const authState = couponSystem.getState().auth;
        const user:string = authState.userType.toLocaleLowerCase(); 
        const user_type:string = user.charAt(0).toUpperCase() + user.slice(1); 
        setUserType( user_type);        
        switch (user_type) {
            case "Customer":
                setUserName(`${authState.name.split('_')[0]} ${authState.name.split('_')[1]}`)
                break;
            case "Company":
                setUserName(authState.name);
                break;
            case "Admin":
                setUserName(`${authState.name.split('_')[0]} ${authState.name.split('_')[1]}`);
                break;
        }       
    });   
    const handleClick = ()=>{
        switch (userType) {
            case "Customer":
                navigate('/customer/details')
                break;
            case "Company":
                navigate('/company/details')
                break;
            case "Admin":
                navigate('/customer/details')
                break;
    }
}
    return (
    <div className="Header">
    <div className="Left">
       <div className="Contact">
        <div className="Highlight">Email:</div>
        <div className="Email">coupon@coupon.com</div>
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
        {isLogged && <div onClick={()=>handleClick()} className="WelcomeUser" >{`${userType} : ${userName}`}</div>}
        <div onClick={()=>handleLogin()} className="ProfileButton">{isLogged?"logout":"login"}</div>
        {!isLogged && <div className="ProfileButton" onClick={()=>navigate("/register")}>register</div>}
        </div>
        <img  onClick={()=>setVisible(!visible)} src={profile} />
        </div>
    </div>
    </div>)
}