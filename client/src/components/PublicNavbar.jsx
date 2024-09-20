import {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import logo from "src/assets/logo.jpg";
import {BreadCrumbComponent} from "src/components/Breadcrumb.jsx";
import {SmallContainer} from "src/components/Container.jsx";
import {NavLink, useLocation} from "react-router-dom";

function PublicNavbar(args) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args} color='primary'>
                <NavLink to="/" className='me-auto navbar-brand'>
                    <div>
                        <img width="40px" src={logo} alt='logo' className="mx-2 rounded-3 text-primary"/>
                        <span className='text-white'>Municipalidad de la Esperanza</span>
                    </div>
                </NavLink>
                <NavbarToggler onClick={toggle} className='text-white'/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink to="/publicaciones" className='text-white'>
                                Publicaciones
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <SmallContainer className="py-3">
                <BreadCrumbComponent location={location} defaultHome='/'/>
            </SmallContainer>
        </div>
    );
}

export default PublicNavbar;