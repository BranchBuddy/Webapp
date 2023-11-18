import React from 'react';
import MainNav from '../components/general/MainNav';
import {Outlet} from 'react-router-dom';
import NavBar from "../components/general/NavBar";

function Root() {
    return (
        <>
            <NavBar/>
            <div className="flex flex-row h-screen w-screen">
                <div className="bg-content1">
                    <MainNav/>
                </div>
                <div className="w-full">
                    {/* The Outlet component renders the content based on React Router routes */}
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default Root;
