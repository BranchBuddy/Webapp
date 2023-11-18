import React from 'react';
import MainNav from '../components/general/MainNav';
import { Outlet } from 'react-router-dom';

function Root() {
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="bg-content1">
                <MainNav />
            </div>
            <div className="p-6 bg-content2 w-full max-h-screen">
                {/* The Outlet component renders the content based on React Router routes */}
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
