import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav} from 'reactstrap';

function Header() {

    const {pathname} = useLocation()

    const [collapse, setCollapse] = React.useState(false)

    if(pathname === '/portaria'){
        return <></>
    }else{
        return (
            <Navbar color="dark" dark expand="md" className='fixed-top' id='navbar'>
                <NavbarBrand className="me-auto" href="/" >
                    Reconhecimento Facial CC 
                </NavbarBrand>
                <NavbarToggler className="me-2" onClick={() => { setCollapse(!collapse)}} />
    
                <Collapse navbar isOpen={collapse} >
                    <Nav navbar className='ps-3'>
                        <NavLink to="/dados" className="NavbarLink my-2 m-md-0 me-md-3" onClick={() => {setCollapse(false)}}><i className="bi bi-code-square me-2"></i>Dados </NavLink>
                        <NavLink to="/consulta" className="NavbarLink my-2 m-md-0 me-md-3" onClick={() => {setCollapse(false)}}><i className="bi bi-filter-square me-2"></i>Consulta </NavLink>
                        <NavLink to="/validacao" className="NavbarLink my-2 m-md-0 me-md-3" onClick={() => {setCollapse(false)}}><i className="bi bi-check-square me-2"></i>Validação </NavLink>
                        <NavLink to="/cadastro" className="NavbarLink my-2 m-md-0 me-md-3" onClick={() => {setCollapse(false)}}><i className="bi bi-plus-square me-2"></i>Cadastro </NavLink>
                        <NavLink to="/remocao" className="NavbarLink my-2 m-md-0 me-md-3" onClick={() => {setCollapse(false)}}><i className="bi bi-dash-square me-2"></i>Remoção </NavLink>
                        
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
    
}

export default Header