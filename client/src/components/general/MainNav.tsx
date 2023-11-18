import React from 'react';
import Sidebar from './SideBarNav/SideBar';

function MainNav() {
    return (
        <div className="flex flex-col justify-between h-full w-full">
            <Sidebar></Sidebar>
        </div>
    );
}

export default MainNav;
