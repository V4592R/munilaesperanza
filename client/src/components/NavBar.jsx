import {NavLink} from 'react-router-dom';
import {
    Navbar,
} from 'reactstrap';
import {useLocation} from 'react-router-dom';
import {useUser} from 'src/utils/useUser';
import {LogOutButton} from 'src/users/Logout';
import {BreadCrumbComponent} from './Breadcrumb';
import {SmallContainer} from './Container';
import logo from "src/assets/logo.jpg";

export const NavBar = () => {
    const user = useUser();
    const location = useLocation()

    return (
        <div>
            <Navbar color="primary" className="text-white">
                <NavLink to="/admin" className="me-auto navbar-brand">
                    <img width="40px" src={logo} alt='logo' className="mx-2 rounded-3 text-primary"/>
                    <span className='text-white'>Municipalidad de la Esperanza</span>
                </NavLink>
                <div className="px-4">
                    <span>{user ? `${user.username} - ${user.first_name} ${user.last_name} ` : ''}</span>
                </div>
                <LogOutButton/>
            </Navbar>
            <SmallContainer className="py-3">
                <BreadCrumbComponent location={location}/>
            </SmallContainer>
        </div>
    );
}

