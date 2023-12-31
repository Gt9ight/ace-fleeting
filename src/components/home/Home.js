import React from "react";
import InfoCards from "./InfoCards";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    return (

        
        <div className="menu-container">
           
            <h1 className="title">WELCOME TO YOUR FLEET MANGER</h1>
                <InfoCards />
            <div className="fleet-checker">
                <Link className="fleet-checkerbutton" to='/fleetmanagersignin' >Fleet Checker</Link>
            </div>
            <div className="fleet-customer">
                <Link className="fleet-checkerbutton" to='/customersignin' >Customer</Link>
            </div>
            <div className="technician">
                <Link className="technicianbutton" to='/techniciansignin'>Technician</Link>
            </div>
        </div>
    )
}

export default Home;