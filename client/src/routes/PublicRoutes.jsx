
import {Outlet} from "react-router-dom";
import PublicNavbar from "src/components/PublicNavbar.jsx";

const PublicRoutes = () => {
    return (
        <>
            <PublicNavbar/>
            <Outlet/>
        </>

    );

}


export default PublicRoutes;