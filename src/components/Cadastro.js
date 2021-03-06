import React from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Toast, ToastHeader, ToastBody } from 'reactstrap';


function Cadastro() {

    const [etapaCad, setEtapaCad] = React.useState(1)
    const [carregando, setCarregando] = React.useState(false)

    const [dadosSocio, setDadosSocio] = React.useState({})

    const [cadastroSuccess, setCadastroSuccess] = React.useState(false)
    const [cadastroFail, setCadastroFail] = React.useState(false)
    const [cadastroFailImages, setCadastroFailImages] = React.useState([])

    const [dataUrls, setDataUrls] = React.useState(['', '', ''])


    function Etapa1() {
        return (
            <>
                <div className='my-3'>

                    <label className="form-label mb-0">CPF</label>
                    <input type="number" className="form-control" id="inpCPF" />
                    <label id='erroCPF' className='d-none' style={{ color: '#dc3545' }}>Campo obrigatório</label>
                </div>

                <Toast id='alertCPF' className='toastCustom toastHide'>
                    <ToastHeader icon="warning">
                        CPF NÃO ENCONTRADO!
                    </ToastHeader>
                    <ToastBody>
                        Verifique se o CPF foi digitado corretamente.
                    </ToastBody>
                </Toast>

                <Toast id='alertCadastrado' className='toastCustom toastHide' >
                    <ToastHeader icon="danger">
                        ASSOCIADO JÁ CADASTRADO!
                    </ToastHeader>
                    <ToastBody>
                        O CPF inserido pertence a um associado já cadastrado na plataforma de reconhecimento facial. <br />
                        <strong>Para recadastrar o associado apague o cadastro atual.</strong>
                        <div className='w-100 d-flex'>
                            <a className='btn btn-danger btn-sm mx-auto' href='/remocao'>REMOVER CADASTRO</a>
                        </div>

                    </ToastBody>
                </Toast>

                <button className="btn btn-success" id="btnSend" onClick={handleEtapa1}>CONTINUAR</button>
            </>
        )
    }

    function handleEtapa1() {
        console.log(document.getElementById('inpCPF').value)
        const inpCPF = document.getElementById('inpCPF')

        if (inpCPF.value === '') {
            document.getElementById('erroCPF').classList.remove('d-none')
        } else {

            axios.post(`${process.env.REACT_APP_ENDERECO_API}/getDadosUser`, { "cpf": inpCPF.value })
                .then((res) => {

                    if (res.data) {

                        if (res.data.statusRF === 'A') {
                            document.getElementById('alertCadastrado').classList.remove('toastHide')
                        } else {
                            setDadosSocio(res.data)
                            setEtapaCad(2)
                        }



                    } else {

                        document.getElementById('alertCPF').classList.remove('toastHide')

                    }


                })

        }

    }

    function Etapa2() {

        console.log(dadosSocio)

        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <p className="card-subtitle mb-2 border-bottom"><strong>Nome</strong> <br />{dadosSocio.NOME}</p>
                        {dadosSocio.NOME_TITU ? <p className="card-subtitle mb-2 border-bottom"><strong>Nome Titular</strong> <br />{dadosSocio.NOME_TITU}</p> : <></>}
                        <p className="card-subtitle "><strong>N° Carteirinha</strong> <br />{dadosSocio.CARTEIRINHA}</p>
                    </div>
                    {dadosSocio.INADIMPLENTE !== 'N' ? <div className='inadimplente p-1'>INADIMPLENTE</div> : <></>}

                    <div className='w-100 d-flex p-2'>
                        <button className="btn btn-outline-danger me-5" onClick={() => { handleEtapa2('R') }}>RETORNAR</button>
                        <button className="btn btn-success ms-5" onClick={() => { handleEtapa2('C') }}>CONTINUAR</button>

                    </div>

                </div>

                {/*<div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{dadosSocio.NOME}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">CPF: {dadosSocio.CPF}</h6>
                        <h6 className="card-subtitle mb-5 text-muted">Código: {dadosSocio.CODIGO}</h6>
                        <button className="btn btn-outline-danger me-5" id="btnSend" onClick={() => { handleEtapa2('R') }}>RETORNAR</button>
                        <button className="btn btn-success ms-5" id="btnSend" onClick={() => { handleEtapa2('C') }}>CONTINUAR</button>
                    </div>
                </div>*/}

            </>
        )
    }

    function handleEtapa2(escolha) {
        if (escolha === 'R') {
            setEtapaCad(1)
        } else {
            setEtapaCad(3)
        }

    }

    function Etapa3() {
        return (
            <>
                <div id='cardFoto1' className="mb-3 mx-5">
                    <h4 className='mt-2 mx-auto'>FOTO FRONTAL</h4>
                    <img src='assets/frente.png' className="card-img-top shadow" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp1' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(1) }} ></input>
                        <label htmlFor='fileInp1' id="label1" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto2' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO LATERAL DIR.</h4>
                    <img src='assets/latDir.png' className="card-img-top shadow" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp2' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(2) }}></input>
                        <label htmlFor='fileInp2' id="label2" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto3' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO LATERAL ESQ.</h4>
                    <img src='assets/latEsq.png' className="card-img-top shadow" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp3' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(3) }}></input>
                        <label htmlFor='fileInp3' id="label3" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                {/*<div id='cardFoto4' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO CIMA</h4>
                    <img src='assets/cima.png' className="card-img-top shadow" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp4' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(4) }}></input>
                        <label htmlFor='fileInp4' id="label4" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto5' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO BAIXO</h4>
                    <img src='assets/baixo.png' className="card-img-top shadow" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp5' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(5) }}></input>
                        <label htmlFor='fileInp5' id="label5" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>*/}

            </>
        )
    }

    function TelaCarregamento(props) {
        return (
            <div className='telaCarregamento d-flex flex-column align-items-center justify-content-center'>
                <div class="lds-facebook">
                    <div></div> <div></div> <div></div>
                </div>
                CARREGANDO
            </div>
        )

    }

    function ImagensModalDeErro() {

        let elements = []

        for (let i = 0; i < cadastroFailImages.length; i++) {
            elements.push(
                <div className='col-6'>
                    <div className="card mt-3">
                        <img src={cadastroFailImages[i]} className="card-img-top" alt='' />
                    </div>
                </div>
            )

        }
        return elements
    }


    function loadImage(nInput) {
        let dataUlrsTemp = dataUrls

        let fileInp = document.getElementById(`fileInp${nInput}`)
        let imgFile = fileInp.files[0]

        try {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')

            let imageObj = new Image();
            let reader = new FileReader();
            reader.readAsDataURL(imgFile);
            reader.onloadend = function (e) {
                imageObj.src = e.target.result
            }
            imageObj.onload = function () {

                console.log('imagem carregada')

                canvas.width = imageObj.width * 0.4
                canvas.height = imageObj.height * 0.4

                ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);


                dataUlrsTemp[nInput - 1] = canvas.toDataURL()

                setDataUrls(dataUlrsTemp)


                if (nInput !== 3) {
                    const cardAtual = document.getElementById(`cardFoto${nInput}`)
                    const cardNext = document.getElementById(`cardFoto${nInput + 1}`)

                    cardAtual.classList.add('d-none')
                    cardNext.classList.remove('d-none')
                } else {
                    setCarregando(true)

                    axios.post(`${process.env.REACT_APP_ENDERECO_API}/cadastrar`, { "label": dadosSocio.CODIGO, "dataUrls": dataUrls })
                        .then(res => handleCadastro(res))
                }

            }
        }
        catch (err) {

            dataUlrsTemp[nInput - 1] = ''

            setDataUrls(dataUlrsTemp)

        }

    }

    function handleCadastro(res) {

        setCarregando(false)

        console.log(res)

        if (res.data[1].Status === 'Cadastrado')
            setCadastroSuccess(true)
        else {
            setCadastroFail(true)
            setCadastroFailImages(res.data[0])
        }
    }







    return (
        <div className='container-fluid d-flex flex-column align-items-center' style={{ marginTop: '70px' }}>

            <div className='titulo w-100 mb-4'>
                <h2 className='mb-0 fw-bolder'>CADASTRO</h2>
                <p className='text-muted border-bottom mb-0'>Insira o CPF do associado e valide sua identidade para realizar o cadastro.</p>
            </div>

            {etapaCad === 1 ? <Etapa1></Etapa1> : <></>}

            {etapaCad === 2 ? <Etapa2></Etapa2> : <></>}

            {etapaCad === 3 ? <Etapa3></Etapa3> : <></>}

            {carregando ? <TelaCarregamento description='CADASTRANDO'></TelaCarregamento> : <></>}


            <Modal fade={false} fullscreen isOpen={cadastroSuccess}>
                <ModalHeader style={{ backgroundColor: '#198754', color: '#FFF' }}>
                    <strong>CADASTRO EFETUADO</strong>
                </ModalHeader>
                <ModalBody>
                    Sócio cadastrado

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => {
                            setCadastroSuccess(false)
                            window.location.href = "/"
                        }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <Modal fade={false} fullscreen isOpen={cadastroFail}>
                <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                    <strong>FALHA NO CADASTRO</strong>
                </ModalHeader>
                <ModalBody>
                    <p>- Verifique se o nome foi preenchido corretamente.</p>
                    <p>- Verifique se a pessoa está visível nas fotos enviadas.</p>

                    <div className='container-fluid'>
                        <div className='row'>
                            <ImagensModalDeErro></ImagensModalDeErro>
                        </div>
                    </div>

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setCadastroFail(false) }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>



            <NavLink className='btnCancelar shadow' to="/"><i className="bi bi-x"></i></NavLink>
        </div>
    )
}

export default Cadastro;