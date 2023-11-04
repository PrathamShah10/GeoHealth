import React from "react";
import { Link } from "react-router-dom";

const VNavbar = () => {
    return (
        <>                            
            <div className="w-1/6 h-screen bg-white shadow-lg"> 
                <div>
                    <h1 className="pl-5 pt-4 pb-4  text-sea-green-600  text-2xl font-bold color ">Services</h1>
                </div>
                <div className="h-0.5 bg-gray-100 " ></div>
                <Link to="/newspage" className="w-full flex hover:bg-gray-100">
                    <img className="h-8 m-2  " src="./news2.png" alt="" />
                    <p className="pl-1 pt-3 pb-3 hover:pl-2 font-semibold text-lg ">Personalized News</p>
                </Link>
                <div className="h-0.5 bg-gray-100"></div>
                <Link to="/health-data" className="w-full flex hover:bg-gray-100" >
                    <img className="h-8 m-2" src="./diseases.png" alt="" />
                    <p className="pl-1 pt-3 pb-3 hover:pl-2 font-semibold text-lg ">Disease History</p>
                </Link>
                <div className="h-0.5 bg-gray-100"></div>
                <Link to="/food"  className="w-full flex hover:bg-gray-100">
                    <img className="h-8 m-2" src="./restaurant.png" alt="" />
                    <p className="pl-1 pt-3 pb-3 hover:pl-2 font-semibold text-lg ">Dishes</p>
                </Link>
                <div className="h-0.5 bg-gray-100"></div>
                <Link to="/community-chat"  className="w-full flex hover:bg-gray-100">
                    <img className="h-8 m-2" src="./chat.png" alt="" />
                    <p className="pl-1 pt-3 pb-3 hover:pl-2 font-semibold text-lg ">Community Chat</p>
                </Link>
                <div className="h-0.5 bg-gray-100"></div>
                <Link to="/hospital"  className="w-full flex hover:bg-gray-100   ">
                    <img className="h-8 m-2" src="./hospital.png" alt="" />
                    <p className="pl-1 pt-3 pb-3 hover:pl-2 font-semibold text-lg ">Nearby Hospital</p>
                </Link>
                <div className="h-0.5 bg-gray-100"></div>

            </div>

        </>
    );
}

export default VNavbar;
