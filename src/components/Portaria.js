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
                /*if (device.kind === "videoinput" && !(device.label.includes('DroidCam Source'))) {
                    console.log(device)
                    return device
                }*/

                if (device.kind === "videoinput") {
                    console.log(device)
                    return device
                }

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
    const camera3 = React.useRef(null);
    const camera4 = React.useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                console.log('Enter')
                setSociosDetectados([])
    
            }
        }, false);
    }, [])

    useEffect(() => {
        setTimeout(capture, 2000)
    }, [attConsulta]);

    

    function capture() {
        const dataUrl1 = camera1.current.getScreenshot();
        //const dataUrl2 = camera2.current.getScreenshot();

        axios.post('http://jboss.ddns.me:6061/validar', { "dataUrl": dataUrl1 })
            .then(res => handleResponse(res.data))

        //axios.post('http://jboss.ddns.me:6061/validar', { "dataUrl": dataUrl2 })
            //.then(res => handleResponse(res.data))
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
                <div className='col-2' key={Math.random()}>
                    <div className="card mb-3">
                        <img src={socio.foto} className="card-img-top" alt="..." style={{ maxHeight: '30vh' }} />
                        <div className="card-body cardAssociado">
                            <p className="card-subtitle mb-2 border-bottom"><strong>Nome</strong> <br />{socio.dados.NOME}</p>
                            {socio.dados.NOME_TITU ? <p className="card-subtitle mb-2 border-bottom"><strong>Nome Titular</strong> <br />{socio.dados.NOME_TITU}</p> : <></>}
                            <p className="card-subtitle "><strong>N° Carteirinha</strong> <br />{socio.dados.CARTEIRINHA}</p>
                        </div>
                        {socio.dados.INADIMPLENTE !== 'N' ? <div className='inadimplente p-1'>INADIMPLENTE</div> : <div className='liberado p-1'>LIBERADO</div>}

                    </div>
                </div>

            )
        ));

        return elements
    }






    return (
        <>
            <div className="container-fluid" style={{ maxWidth: '100vw' }}>


                <div className='cameraFeedContainer' id='cameraFeedContainer'>

                    <div className='ms-auto'>
                        <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: '4e6c8afe899135bdc2496ddc7c841fdeb852a4b1bee87f617e48aa1cd1b2a3d1' }} forceScreenshotSourceSize={true} screenshotFormat="image/jpeg" className='cameraFeed m-1 me-3 shadow' />
                        {/*<Webcam ref={camera2} audio={false} videoConstraints={{ deviceId: '88840af44e21a00b34e9784d3df911559b2e447f430f96289e3be69bbc8f97ed' }} forceScreenshotSourceSize={true} screenshotFormat="image/jpeg" className='cameraFeed m-1 shadow' />
                    </div>

                    <div className='ms-auto'>
                        <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: 'd06bff9ebd9bc25d032647412794bfb82a7b06fef2526e6f77f478e43bdd6020' }} forceScreenshotSourceSize={true} screenshotFormat="image/jpeg" className='cameraFeed m-1 shadow' />
    <Webcam ref={camera4} audio={false} videoConstraints={{ deviceId: '' }} forceScreenshotSourceSize={true} screenshotFormat="image/jpeg" className='cameraFeed m-1 shadow' /> */}
                    </div>



                    {/*devices.map((device, key) => (
                            <div className='' key={device.deviceId} style={{ width: '100%' }}>
                                <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: device.deviceId }} screenshotFormat="image/jpeg" width={'100%'} />
                                <small className='fw-light'>{device.label || `Device ${key + 1}`}</small>
                            </div>
                        ))*/}

                </div>

                <div className='container-fluid p-3'>
                    <div className='row'>
                        <DisplaySociosDetectados ></DisplaySociosDetectados>
                    </div>
                </div>






            </div>
        </>
    )
}

export default Portaria