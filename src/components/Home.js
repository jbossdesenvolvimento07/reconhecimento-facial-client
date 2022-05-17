import React, { useEffect } from 'react'
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


    useEffect(() => {
        setMarginHeader()

    }, [])

    function setMarginHeader() {
        const navbarHeight = document.getElementById('navbar').clientHeight

        document.getElementById('marginHeader').style.height = `${navbarHeight}px`

    }

    return (
        <>
            <div id='marginHeader' style={{ width: '100vw' }}></div>

            <img src="assets/banner.jpg" className='img-fluid m-0 d-lg-none' alt="" />

            <div className='container d-flex flex-column justify-content-center align-items-center mt-4'>

                <NavLink to="/dados" className='btnHome'>
                    <div>
                       <p className='mb-0 fs-2 fw-bolder'><i className="bi bi-code-square me-1"></i> DADOS</p> 
                       <p className='mb-0'>Estatisticas e informações.</p>
                    </div>
                    
                    <i className="bi bi-chevron-right ms-2 fs-1"></i> 
                </NavLink>

                <NavLink to="/consulta" className='btnHome'>
                    <div>
                       <p className='mb-0 fs-2 fw-bolder'><i className="bi bi-filter-square me-1"></i> CONSULTA</p> 
                       <p className='mb-0'>Pesquise os dados cadastrais de associados.</p>
                    </div>
                    
                    <i className="bi bi-chevron-right ms-2 fs-1"></i> 
                </NavLink>

                <NavLink to="/validacao" className='btnHome'>
                    <div>
                       <p className='mb-0 fs-2 fw-bolder'><i className="bi bi-check-square me-1"></i> VALIDAÇÃO</p> 
                       <p className='mb-0'>Tire a foto de um associado para verificar sua identidade.</p>
                    </div>
                    
                    <i className="bi bi-chevron-right ms-2 fs-1"></i> 
                </NavLink>

                <NavLink to="/cadastro" className='btnHome'>
                    <div>
                       <p className='mb-0 fs-2 fw-bolder'><i className="bi bi-plus-square me-1"></i> CADASTRO</p> 
                       <p className='mb-0'>Registre um associado na plataforma de reconhecimento facial.</p>
                    </div>
                    
                    <i className="bi bi-chevron-right ms-2 fs-1"></i> 
                </NavLink>

                <NavLink to="/remocao" className='btnHome'>
                    <div>
                       <p className='mb-0 fs-2 fw-bolder'><i className="bi bi-dash-square me-1"></i> REMOÇÃO</p> 
                       <p className='mb-0'>Remova um associado da plataforma de reconhecimento facial.</p>
                    </div>
                    
                    <i className="bi bi-chevron-right ms-2 fs-1"></i> 
                </NavLink>



                {/*<button className="btn btn-outline-secondary btn-sm my-5" id="btnSend" onClick={() => { toggleFullscreen() }}>FULLSCREEN</button>*/}

            </div>

        </>

    )
}

export default Home;