import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

function Header() {

    const [collapse, setCollapse] = React.useState(false)

    return (
        <Navbar color="dark" dark expand="md" className='fixed-top' >
            <NavbarBrand className="me-auto" href="/" >
                Reconhecimento Facial CC 
            </NavbarBrand>
            <NavbarToggler className="me-2" onClick={() => { setCollapse(!collapse)}} />

            <Collapse navbar isOpen={collapse} >
                <Nav navbar className='ps-3'>
                    <NavLink to="/validacao" className="NavbarLink my-2 m-md-0 me-md-3"><i className="bi bi-check-square me-2"></i>Validação </NavLink>
                    <NavLink to="/cadastro" className="NavbarLink my-2 m-md-0 me-md-3"><i className="bi bi-plus-square me-2"></i>Cadastro </NavLink>
                    <NavLink to="/configuracao" className="NavbarLink mt-4 mb-2 m-md-0"><i className="bi bi-gear me-2"></i>Configuração </NavLink>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header