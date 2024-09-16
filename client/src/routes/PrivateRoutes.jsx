import {Outlet, Navigate} from 'react-router-dom'
import {NavBar} from 'src/components/NavBar';
import {useUser} from 'src/utils/useUser';
import {checkRoles} from 'src/utils/constants';
import PropTypes from "prop-types";


const PrivateRoutes = ({forStaff = false}) => {
    const user = useUser();

    if (!user || !user.token) return <Navigate to="/admin/login"/>

    return (
        checkRoles(forStaff, user) ? (
            <>
                <NavBar/>
                <Outlet/>
            </>

        ) : <Navigate to="/admin"/>
    )
}

PrivateRoutes.propTypes = {
    forStaff: PropTypes.bool,
}

export default PrivateRoutes