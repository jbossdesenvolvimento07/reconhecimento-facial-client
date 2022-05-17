import React, { useEffect } from 'react'
import axios from 'axios'


function Dados() {

    const [dados, setDados] = React.useState()
    const date = new Date()

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_ENDERECO_API}/getDadosReconhecimento`)
            .then(res => setDados(res.data))
    }, [])


    return (
        <>
            <div className='container-fluid d-flex flex-column align-items-center px-5' style={{ marginTop: '70px' }}>

                <div className='titulo w-100 mb-4'>
                    <h2 className='mb-0 fw-bolder'>DADOS</h2>
                    <p className='text-muted border-bottom mb-0'>Estatisticas e informações {date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}.</p>
                </div>

                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">ASSOCIADOS</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Número de associados que se encontram em estado de ativos com o clube.</h6>
                            <p className="card-text fw-bolder fs-3">{dados ? dados.ASSOCIADOS : '-'} </p>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">RECONHECIMENTO</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Número de associados Cadastrados no Reconhecimento Facial.</h6>
                            <p className="card-text fw-bolder fs-3">{dados ? dados.RECONHECIMENTO : '-'} </p>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default Dados