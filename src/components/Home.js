import React from 'react'
import { NavLink } from "react-router-dom";
import screenfull from 'screenfull';

function Home() {

    /*if (screenfull.isEnabled) {
        screenfull.request();
    }*/

    function toggleFullscreen() {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', minHeight: '100vh' }}>

            <NavLink className='btn btn-primary btn-lg my-4' to="/Validar" style={{ width: '50%' }}>VALIDAR</NavLink>
            <NavLink className='btn btn-outline-primary btn-lg my-4' to="/cadastro" style={{ width: '50%' }}>CADASTRO</NavLink>

            <button className="btn btn-outline-secondary btn-sm my-5" id="btnSend" onClick={() => { toggleFullscreen() }}>FULLSCREEN</button>

        </div>
    )
}

export default Home;