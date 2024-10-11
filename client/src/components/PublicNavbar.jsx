import {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
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
            <Navbar {...args} color='primary' expand='lg'>
                <NavLink to="/" className='me-3 navbar-brand'>
                    <div>
                        <img width="40px" src={logo} alt='logo' className="mx-2 rounded-3 text-primary"/>
                        <span className='text-white d-none d-md-inline'>Municipalidad de la Esperanza</span>
                    </div>
                </NavLink>
                <NavbarToggler onClick={toggle} className='border-0 shadow-none bg-primary'/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem className='text-center text-lg-start mx-2'>
                            <NavLink to="/" className={({isActive}) =>
                                `text-secondary ${isActive ? "text-decoration-underline" : "text-decoration-none"}`
                            }>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem className='text-center text-lg-start mx-2'>
                            <NavLink to="/publicaciones" className={({isActive}) =>
                                `text-secondary ${isActive ? "text-decoration-underline" : "text-decoration-none"}`
                            }>
                                Publicaciones
                            </NavLink>
                        </NavItem>
                        <NavItem className='text-center text-lg-start mx-2'>
                            <NavLink to="/servicios" className={({isActive}) =>
                                `text-secondary ${isActive ? "text-decoration-underline" : "text-decoration-none"}`
                            }>
                                Servicios
                            </NavLink>
                        </NavItem>
                        <NavItem className='text-center text-lg-start mx-2'>
                            <NavLink to="/sugerencias" className={({isActive}) =>
                                `text-secondary ${isActive ? "text-decoration-underline" : "text-decoration-none"}`
                            }>
                                Dar sugerencias
                            </NavLink>
                        </NavItem>
                        <NavItem className='text-center text-lg-start mx-2'>
                            <NavLink to="/formulario-agua" className={({isActive}) =>
                                `text-secondary ${isActive ? "text-decoration-underline" : "text-decoration-none"}`
                            }>
                                Solicitud de agua
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