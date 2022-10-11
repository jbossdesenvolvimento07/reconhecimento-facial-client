import React, { useEffect } from 'react'
import axios from 'axios'
import Webcam from "react-webcam";


function Portaria() {


  const [devices, setDevices] = React.useState([]);

  const [sociosDetectados, setSociosDetectados] = React.useState([]);

  const [attConsulta, setAttConsulta] = React.useState(false);

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

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        console.log('Enter')
        setSociosDetectados([])

      }
    }, false);


  }, [])



  useEffect(() => {
    setTimeout(capture, 1000)
  }, [attConsulta]);




  function capture() {

    console.log('Foto')
    const dataUrl1 = camera1.current.getScreenshot();

    axios.post(`${process.env.REACT_APP_ENDERECO_API}/validar`, { "dataUrl": dataUrl1 })
      .then(res => handleResponse(res.data))
      .catch(err => { console.log(err); setAttConsulta(!attConsulta) })

  }

  function handleResponse(data) {

    console.log(data)

    //Percorre cada um da resposta
    for (let i = 0; i < data.length; i++) {
      if (data[i].dados !== 'unknown') {
        if (!verificaAssociadoJaDetectado(data[i].dados.CODIGO)){
          let sociosDetectadosTemp = sociosDetectados
          sociosDetectadosTemp.push(data[i])
          setSociosDetectados(sociosDetectadosTemp)
        }
      }
    }

    setAttConsulta(!attConsulta)
  }

  function verificaAssociadoJaDetectado(codAssociado) {
    let jaDetectado = false

    // Percorre a lista de associados detectados e verifica se o associado já foi detectado
    for (let i = 0; i < sociosDetectados.length; i++) {
      if (sociosDetectados[i].dados.CODIGO === codAssociado) {
        jaDetectado = true
        break
      }
    }

    return jaDetectado
  }


  function DisplaySociosDetectados() {

    let elements = []

    sociosDetectados.forEach(socio => (
      elements.push(
        <div className='col-2' key={Math.random()}>
          <div className="card mb-3">
            <img src={socio.foto} className="" alt="..." style={{ maxHeight: '30vh' }} />
            <div className="card-body cardAssociado">
              <p className="card-subtitle mb-2 border-bottom"><strong>Nome</strong> <br />{socio.dados.NOME}</p>
              {socio.dados.NOME_TITU ? <p className="card-subtitle mb-2 border-bottom"><strong>Nome Titular</strong> <br />{socio.dados.NOME_TITU}</p> : <></>}
              <p className="card-subtitle "><strong>N° Carteirinha</strong> <br />{socio.dados.CARTEIRINHA}</p>
            </div>
            {socio.dados.INADIMPLENTE === 'S'
              ? <div className='inadimplente p-1'>INADIMPLENTE <p>Entrou {socio.dados.vezesInadimplente} vez(es)</p></div>
              : <div className='liberado p-1'>LIBERADO</div>
            }
            {socio.ingressos && socio.ingressos.length > 0
              ? socio.ingressos.map(ingresso => ( 
                <div className='ingresso p-1' key={Math.random()}>{ingresso.nomeEvento}<br/>{ingresso.nomeIngresso} | {ingresso.nomeSubingresso}</div>
              ))
              : <></>
            }

          </div>
        </div>

      )
    ));

    return elements
  }

  return (
    <>
      <div className='pictureTimer' id='pictureTimer'></div>
      <div className="container-fluid" style={{ maxWidth: '100vw' }}>
        <div className='cameraFeedContainer' id='cameraFeedContainer'>
          <div className='ms-auto'>
            <Webcam ref={camera1} audio={false} videoConstraints={{ deviceId: process.env.REACT_APP_IDCAMERA }} forceScreenshotSourceSize={true} screenshotFormat="image/jpeg" className='cameraFeed m-1 me-3 shadow' />
          </div>
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