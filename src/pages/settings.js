import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import backgroung from "../assets/background2.png";

const Settings = () => {

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    if(isAuthenticated === false){
        navigate("/");
    }  

    return(
        <div style={{ backgroundImage: `url(${backgroung})`, height:'100vh' }}>
            <div  className="flex pt-10">
                <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">            
                    <div className="px-6 py-4 bg-white">
                        <p className="font-bold text-xl mb-2">
                        Settings.........
                        </p>
                    </div>
                </div>  
            </div>      
        </div>
    )
}

export default Settings;