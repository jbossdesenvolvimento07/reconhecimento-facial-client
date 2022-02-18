import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Webcam from "react-webcam";

function Portaria() {

    const [devices, setDevices] = React.useState([]);

    const [sociosDetectados, setSociosDetectados] = React.useState([]);

    const [attConsulta, setAttConsulta] = React.useState(false);
    //const { sociosDetectados, setSociosDetectados } = useSocios();

    //let sociosDetectados = []

    const handleDevices = React.useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter((device) => {
                if (device.kind === "videoinput" && !(device.label.includes('DroidCam Source'))) {
                    console.log(device)
                    return device
                }

                /*if (device.label === "Iriun Webcam") {
                    console.log(device)
                    return device
                }*/

            })),
        [setDevices]
    );

    React.useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );



    //
    //-----------------------------------------------------------
    //




    const camera1 = React.useRef(null);
    const camera2 = React.useRef(null);

    useEffect(() => {
        setTimeout(capture, 5000)
    }, [attConsulta]);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            setSociosDetectados([])

        }
    }, false);

    function capture() {
        const dataUrl1 = camera1.current.getScreenshot();
        const dataUrl2 = camera2.current.getScreenshot();

        axios.post('http://jboss.ddns.me:6061/validar', { "dataUrl": dataUrl1 })
            .then(res => handleResponse(res.data))

        axios.post('http://jboss.ddns.me:6061/validar', { "dataUrl": dataUrl2 })
            .then(res => handleResponse(res.data))
    }

    function handleResponse(data) {

        console.log(data)

        //Percorre cada um da resposta
        for (let i = 0; i < data.length; i++) {



            if (data[i].dados !== 'unknown') {


                if (!verificaAssociadoJaDetectado(data[i].dados.CODIGO))
                    setSociosDetectados([...sociosDetectados, data[i]])

            }
        }

        setAttConsulta(!attConsulta)
    }

    function verificaAssociadoJaDetectado(codAssociado) {
        let jaDetectado = false

        sociosDetectados.map(s => {
            if (s.dados.CODIGO === codAssociado) {
                console.log('igual')
                jaDetectado = true
            }

        })

        return jaDetectado
    }


    function DisplaySociosDetectados() {

        let elements = []

        sociosDetectados.map(socio => (
            elements.push(
                <div className='col-4' key={Math.random()}>
                    <div className="card" >
                        <img src={socio.foto} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h6 className="card-title"> {socio.dados.NOME}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">CPF: {socio.dados.CPF}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Código: {socio.dados.motivoInadimplencia}</h6>
                        </div>
                    </div>
                </div>

            )
        ));

        return elements
    }

    return (
        <>
            <div className="container-fluid" style={{ width: '100vw' }}>

                <div className='row'>
                    <div className='col-4'>
                        {/*devices.map((device, key) => (
                            <div className='' key={device.deviceId} style={{ width: '100%' }}>
                                <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: device.deviceId }} screenshotFormat="image/jpeg" width={'100%'} />
                                <small className='fw-light'>{device.label || `Device ${key + 1}`}</small>
                            </div>
                        ))*/}

                        <div style={{ width: '100%' }}>
                            <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: '2fbf59c08a2f5101d7c0454c8983e6287e7cd5d93497466d87c67221caf245a5' }} screenshotFormat="image/jpeg" width={'100%'} />
                            <small className='fw-light'>Irium</small>
                        </div>

                        <div style={{ width: '100%' }}>
                            <Webcam ref={camera2} audio={false} videoConstraints={{ deviceId: '88840af44e21a00b34e9784d3df911559b2e447f430f96289e3be69bbc8f97ed' }} screenshotFormat="image/jpeg" width={'100%'} />
                            <small className='fw-light'>Webcam</small>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <DisplaySociosDetectados ></DisplaySociosDetectados>
                            </div>
                        </div>

                    </div>



                </div>





            </div>
        </>
    )
}

export default Portaria