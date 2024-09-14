import { Outlet, Navigate } from 'react-router-dom'
import { NavBar } from 'src/components/NavBar';
import { useUser } from 'src/utils/useUser';
import { checkRoles } from 'src/utils/constants';
import PropTypes from "prop-types";


const PrivateRoutes = () => {
    const user = useUser();

    if (!user || !user.token) return <Navigate to="login" />

    return (
        checkRoles(false, user) ? (
            <>
                <NavBar />
                <Outlet />
            </>

        ) : <Navigate to="" />
    )
}

PrivateRoutes.propTypes = {
    allow: PropTypes.array,
}

export default PrivateRoutes