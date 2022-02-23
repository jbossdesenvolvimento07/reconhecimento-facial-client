import React, { useEffect } from 'react'
import axios from 'axios'
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

function Configuracao() {

    //Carrega as configurações atuais
    useEffect(() => {
        axios.get('http://jboss.ddns.me:6061/getConfig')
            .then(res => {
                const config = res.data

                setrange(config.distanceThreshold)
            })
    }, []);


    const rangeInp = React.useRef(null);

    const [range, setrange] = React.useState(0.5)

    
    function updateRange(){
        setrange(rangeInp.current.value)
    }





    function handleSalvar(){
        let config = {
            'distanceThreshold': parseFloat(rangeInp.current.value)
        }

        axios.post('http://jboss.ddns.me:6061/setConfig', config)
            .then(res => {
                console.log(res)

                handleToastSucces('o')
            })
    }

    function handleToastSucces(action) {
        let toast = document.getElementById('toastSucces')

        if(action === 'o'){
            toast.classList.remove('toastHide')
        }else{
            toast.classList.add('toastHide')
        }
    }

    return (
        <div className='container-fluid d-flex flex-column align-items-center' style={{ marginTop: '70px' }} >

            <div className='titulo w-100 mb-4'>
                <h2 className='mb-0 fw-bolder'>CONFIGURAÇÕES</h2>
                <p className='text-muted border-bottom mb-0'>Altere as configurações de reconhecimento.</p>
            </div>
            
            <div className='mb-3'>
                <label htmlFor="customRange3" className="form-label w-100">Distância aceitável<strong className='float-end'>{(range * 100).toFixed(0)}%</strong></label>
                <input ref={rangeInp} value={range} type="range" className="form-range" min={0.1} max={0.9} step="0.05" id="rangeInp" onChange={updateRange} />
                <p className='text-muted'>Padrão: 50%</p>
            </div>

            <button className='btn btn-success' onClick={handleSalvar}>SALVAR</button>

            <Toast className='mt-3 toastCustom toastHide' id='toastSucces'>
                <ToastHeader toggle={() => { handleToastSucces('c')}} icon="success">
                    Sucesso 
                </ToastHeader>
                <ToastBody>
                    Alterações foram inseridas no servidor.
                </ToastBody>
            </Toast>

        </div>
    )
}

export default Configuracao