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


    function TelaCarregamento(props) {
        return (
            <div className='telaCarregamento d-flex flex-column align-items-center justify-content-center'>
                <div class="lds-facebook">
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

            axios.post('http://jboss.ddns.me:6061/validar', { "dataUrl": dataUrl })
                .then(res => handleValidacao(res))
        }

    }

    function handleValidacao(res) {

        setCarregando(false)

        console.log(res)

        switch (res.data[1][0]._label) {
            case 'unknown':
                setValFail(true)
                break;

            case 'notFound':
                setValNotFound(true)
                break;

            default:
                setValSuccess(true)
                setImageSuccess(res.data[0][0])
                break;
        }

    }


    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', minHeight: '100vh' }}>
            <div id='cardFoto1' className="mb-3 mx-5">
                <h4 className='mt-2 mx-auto'>FOTO FRONTAL</h4>
                <img src='assets/frente.png' className="card-img-top shadow" alt='imgMissing' />
                <div className="card-body text-start">
                    <input id='fileInp1' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage() }} ></input>
                    <label htmlFor='fileInp1' id="label1" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                </div>
            </div>

            {carregando ? <TelaCarregamento description='VALIDANDO'></TelaCarregamento> : <></>}

            <Modal fade={false} isOpen={valSuccess} fullscreen>
                <ModalHeader style={{ backgroundColor: '#198754', color: '#FFF' }}>
                    <strong>ENTRADA LIBERADA</strong>
                </ModalHeader>
                <ModalBody>
                    <p><strong>SÓCIO: </strong> {""}</p>
                    <p><strong>CPF: </strong> {""}</p>

                    <div className="card mt-4 mx-5">
                        <img src={imageSuccess} className="card-img-top shadow rounded" alt='' />
                    </div>

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setValSuccess(false) }}>
                            OK
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <Modal fade={false} isOpen={valFail} fullscreen>
                <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                    <strong>ENTRADA BLOQUEADA</strong>
                </ModalHeader>
                <ModalBody>
                    Sócio não identificado

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setValFail(false) }}>
                            OK
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
                            OK
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <NavLink className='btn btn-sm btn-outline-danger my-5' to="/">CANCELAR VALIDAÇÃO</NavLink>
        </div>
    )
}

export default Validacao