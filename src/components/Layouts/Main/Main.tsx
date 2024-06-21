import { useAuthRedirect } from "../../../hooks/useAuthRedirect";
import { couponSystem } from "../../../redux/store";
import "./Main.css";
import happyGirl from '../../../assets/images/happyGirl.jpg';
import happyLady from '../../../assets/images/happyLady.jpg';
import horse from '../../../assets/images/horse.jpg';
import gift from '../../../assets/images/gift.jpg';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../../util/notif";

export function Main(): JSX.Element {
    useAuthRedirect("Main");    
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [happyGirl,happyLady,horse,gift];
    const labels = ["Family Vacations","Adventures","Attractions","Gifts"];
    const descriptionsFirst = [ "Investing in family vacations fosters bonding,",
        "Embarking on adventures ignites the spirit of exploration, ",
        "Exploring attractions enriches life experiences, ",
        "Finding the perfect gift adds joy to celebrations and creates "
    ];
    const descriptionsSecond = [" creating cherished moments and strengthening familial relationships.",
    "inspiring personal growth and unforgettable thrills along the way.",
    "offering excitement and discovery for individuals of all ages.",
    "lasting memories for your loved ones."
    ];
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); 
  
      return () => clearInterval(intervalId);
    }, [images.length]);
    return (
        <div className="Main">
			<div className="Left">
            <h1 style={{color:"#ff497c"}}>Unlock Savings, Embrace Deals:</h1>
            <h2 style={{color:"#ff497c"}}> Welcome to Coupon Heaven!</h2>
            <div className="Exclusive">Exclusive Coupons For</div>
            <h1 >{labels[currentImageIndex]}</h1>
            <h2 >And way more!</h2>
            <div className="Description">
                <div>{descriptionsFirst[currentImageIndex]}</div>
                <div>{descriptionsSecond[currentImageIndex]}</div>
            </div>
            <div onClick={()=>{             
              if(couponSystem.getState().auth.userType==="CUSTOMER" || couponSystem.getState().auth.userType==="guest"){
                navigate('/coupons')
              }
              else{
                notify.error("only customers can watch the shop");
              }
              }} className="Shop">Shop Now</div>
            </div>           
			<div className="Right">
            <img src={images[currentImageIndex]}/>
            </div>
        </div>
        
    );
}