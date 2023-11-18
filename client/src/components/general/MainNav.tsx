import React from 'react';
import TopSideBar from './SideBarNav/TopSideBar';
import BotSideBar from './SideBarNav/BotSideBar';

function MainPage() {
    return (
        <div className="flex flex-col justify-between h-full w-full">
            {/* First section in the sidebar */}
            <div className="p-8">
                {/* Add your options here */}
                <TopSideBar />
            </div>
            {/* Second section in the sidebar */}
            <div className="p-8">
                {/* Add login and settings options */}
                <BotSideBar />
            </div>
        </div>
    );
}

export default MainPage;
