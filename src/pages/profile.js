import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import backgroung from "../assets/background2.png";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if(isAuthenticated === false){
      navigate("/");
  }  

  return (
    isAuthenticated && (
      <div style={{ backgroundImage: `url(${backgroung})`, height:'100vh' }}>
        <div className="flex pt-10">
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto bg-slate-50">
              <div className="flex mt-4">
                  <img className="m-auto" src={user.picture} alt={user.name} />
              </div>
              
              <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{user.name}</div>
                  <p className="text-gray-700 text-base">
                      Email: <span className="font-sans font-bold">{user.email}</span>
                  </p>
              </div>
          </div>        
        </div>
      </div>
    )
  );
};

export default Profile;