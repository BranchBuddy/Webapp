import MainNav from '../components/general/MainNav';
import {Outlet} from 'react-router-dom';
import NavBar from "../components/general/NavBar";

function Root() {
    return (
        <div className="h-screen w-screen">
            <NavBar/>
            <div className="flex flex-row h-full w-full">
                <div className="bg-content1">
                    <MainNav/>
                </div>
                <div className="w-full">
                    {/* The Outlet component renders the content based on React Router routes */}
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Root;
