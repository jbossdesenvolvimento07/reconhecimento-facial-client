import React from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Validacao() {

    const [carregando, setCarregando] = React.useState(false)

    const [valSuccess, setValSuccess] = React.useState(false)
    const [valFail, setValFail] = React.useState(false)
    const [valNotFound, setValNotFound] = React.useState(false)

    const [imageSuccess, setImageSuccess] = React.useState('')

    const [dadosSocio, setDadosSocio] = React.useState({})

    const [sociosDetectados, setSociosDetectados] = React.useState([]);


    function TelaCarregamento(props) {
        return (
            <div className='telaCarregamento d-flex flex-column align-items-center justify-content-center'>
                <div className="lds-facebook">
                    <div></div> <div></div> <div></div>
                </div>
                {props.description}
            </div>
        )

    }

    function loadImage() {

        console.log('Mandando requisição')
        let dataUrl
        let imgInput = document.getElementById('fileInp1')
        let imgFile = imgInput.files[0]

        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        let imageObj1 = new Image();

        let reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onloadend = function (e) {
            imageObj1.src = e.target.result
        }

        imageObj1.onload = function () {

            canvas.width = imageObj1.width * 0.2
            canvas.height = imageObj1.height * 0.2

            ctx.drawImage(imageObj1, 0, 0, canvas.width, canvas.height);

            dataUrl = canvas.toDataURL()

            setCarregando(true)

            axios.post(`${process.env.REACT_APP_ENDERECO_API}/validar`, { "dataUrl": dataUrl })
                .then(res => handleValidacao(res.data))
        }

    }

    function handleValidacao(data) {

        setCarregando(false)

        /*console.log(data)

        if (data.length > 0) {
            if (data[0].dados === 'unknown') {
                setValFail(true)
            }
            else {
                setValSuccess(true)
                setImageSuccess(data[0].foto)
                setDadosSocio(data[0].dados)
            }

        } else {
            setValNotFound(true)
        }*/

        console.log(data)

        if (data.length > 0) {
            setSociosDetectados(data)
            setValSuccess(true)

        } else {
            setValNotFound(true)
        }


    }

    function DisplaySociosDetectados() {
        const elements = []
        let countSocios = 0

        sociosDetectados.forEach(socio => {
            if (socio.dados !== 'unknown')
                countSocios++
        })


        if (countSocios > 0) {
            sociosDetectados.forEach(socio => {

                if (socio.dados !== 'unknown') {

                    elements.push(
                        <div className="card mb-3" key={socio.CODIGO}>
                            <div className="row g-0">
                                <div className="col-4 d-flex">
                                    <img src={socio.foto} className="img-fluid rounded-start my-auto" alt='' />
                                </div>
                                <div className="col-8 d-flex flex-column">
                                    <div className="card-body py-3 cardAssociado">
                                        <p className="card-subtitle mb-2 border-bottom"><strong>Nome</strong> <br />{socio.dados.NOME}</p>
                                        {socio.dados.NOME_TITU ? <p className="card-subtitle mb-2 border-bottom"><strong>Nome Titular</strong> <br />{socio.dados.NOME_TITU}</p> : <></>}
                                        <p className="card-subtitle "><strong>N° Carteirinha</strong> <br />{socio.dados.CARTEIRINHA}</p>
                                    </div>
                                    {socio.dados.INADIMPLENTE !== 'N' ? <div className='inadimplente p-1 mt-auto'>INADIMPLENTE</div> : <div className='liberado p-1'>LIBERADO</div>}
                                </div>
                            </div>
                        </div>
                    )

                }

            });
        } else {
            elements.push(
                <div>
                    <div className="card">
                        <div className="card-header fw-bolder" style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                            ASSOCIADO NÃO RECONHECIDO
                        </div>
                        <div className="card-body">
                            <p className="card-text">O rosto do associado não consta no aplicativo de reconhecimento facial, verifique se o associado possui cadastro no sistema.</p>
                            
                        </div>
                    </div>
                </div>
            )
        }

        return elements
    }


    return (
        <div className='container-fluid d-flex flex-column align-items-center' style={{ marginTop: '70px' }}>

            <div className='titulo w-100 mb-4'>
                <h2 className='mb-0 fw-bolder'>VALIDAÇÃO</h2>
                <p className='text-muted border-bottom mb-0'>Tire a foto do associado para verificar sua identidade.</p>
            </div>


            <div id='cardFoto1' className="mb-3 mx-5">
                <h4 className='mt-2 mx-auto'>FOTO FRONTAL</h4>
                <img src='assets/frente.png' className="card-img-top shadow" alt='imgMissing' />
                <div className="card-body text-start">
                    <input id='fileInp1' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage() }} ></input>
                    <label htmlFor='fileInp1' id="label1" className='labelFileInp'> TIRAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                </div>
            </div>



            {carregando ? <TelaCarregamento description='VALIDANDO'></TelaCarregamento> : <></>}

            <Modal fade={false} isOpen={valSuccess} fullscreen>
                <ModalBody>
                    {/*<div className="card mb-3 d-flex">
                        <div className="card-body cardAssociado" style={{width: '60%'}}>
                            <p className="card-subtitle mb-2 border-bottom"><strong>Nome</strong> <br />{dadosSocio.NOME}</p>
                            {dadosSocio.NOME_TITU ? <p className="card-subtitle mb-2 border-bottom"><strong>Nome Titular</strong> <br />{dadosSocio.NOME_TITU}</p> : <></>}
                            <p className="card-subtitle "><strong>N° Carteirinha</strong> <br />{dadosSocio.CARTEIRINHA}</p>
                        </div>
                        {dadosSocio.INADIMPLENTE !== 'N' ? <div className='inadimplente p-1'>INADIMPLENTE</div> : <div className='liberado p-1'>LIBERADO</div>}

                    </div>

                    <div className="card mt-4 mx-5">
                        <img src={imageSuccess} className="card-img-top shadow rounded" alt='' />
                    </div>*/}

                    <DisplaySociosDetectados></DisplaySociosDetectados>

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setValSuccess(false) }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <Modal fade={false} isOpen={valFail} fullscreen>
                <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                    <strong>ASSOCIADO NÃO RECONHECIDO</strong>
                </ModalHeader>
                <ModalBody>
                    O rosto do associado não consta no aplicativo de reconhecimento facial, verifique se o associado possui cadastro no sistema.

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setValFail(false) }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <Modal fade={false} isOpen={valNotFound} fullscreen>
                <ModalHeader style={{ backgroundColor: '#ffc107', color: '#424242' }}>
                    <strong>NÃO RECONHECIDO</strong>
                </ModalHeader>
                <ModalBody>
                    Não foi possível identificar uma pessoa na foto, tente aproximar a câmera ou melhorar a iluminação.

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setValNotFound(false) }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <NavLink className='btnCancelar shadow' to="/"><i className="bi bi-x"></i></NavLink>
        </div>


    )
}

export default Validacao