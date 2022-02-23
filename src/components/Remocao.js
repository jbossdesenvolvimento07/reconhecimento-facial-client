import React from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { Modal, ModalHeader, ModalBody, ModalFooter, Toast, ToastHeader, ToastBody } from 'reactstrap';

function Remocao() {

    const [etapaCad, setEtapaCad] = React.useState(1)
    const [dadosSocio, setDadosSocio] = React.useState({})

    const [remocaoSuccess, setRemocaoSuccess] = React.useState(false)
    const [remocaoFail, setRemocaoFail] = React.useState(false)

    function Etapa1() {
        return (
            <>
                <div className='my-3'>
                    <label className="form-label mb-0">CPF</label>
                    <input type="text" className="form-control" id="inpCPF" maxLength={11} />
                    <label id='erroCPF' className='d-none' style={{ color: '#dc3545' }}>Campo obrigatório</label>
                </div>

                <Toast id='alertCPF' className='toastCustom toastHide'>
                    <ToastHeader icon="warning">
                        CPF NÃO ENCONTRADO!
                    </ToastHeader>
                    <ToastBody>
                        Verifique se o CPF foi digitado corretamente e se o associado está cadastrado na plataforma de reconhecimento facial.
                    </ToastBody>
                </Toast>


                <button className="btn btn-success" id="btnSend" onClick={handleEtapa1}>CONTINUAR</button>
            </>
        )
    }

    function handleEtapa1() {
        const inpCPF = document.getElementById('inpCPF')

        if (inpCPF.value === '') {
            document.getElementById('erroCPF').classList.remove('d-none')
        } else {

            axios.post('http://jboss.ddns.me:6061/getDadosUser', { "cpf": inpCPF.value })
                .then((res) => {

                    if (res.data && res.data.statusRF === 'A') {

                        setDadosSocio(res.data)
                        setEtapaCad(2)



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
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{dadosSocio.NOME}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">CPF: {dadosSocio.CPF}</h6>
                        <h6 className="card-subtitle mb-5 text-muted">Código: {dadosSocio.CODIGO}</h6>
                        <button className="btn btn-outline-danger me-5" id="btnSend" onClick={() => { handleEtapa2('C') }}>CANCELAR</button>
                        <button className="btn btn-success ms-5" id="btnSend" onClick={() => { handleEtapa2('R') }}>REMOVER</button>
                    </div>
                </div>

            </>
        )
    }

    function handleEtapa2(escolha) {
        if (escolha === 'C') {
            setEtapaCad(1)
        } else {
            axios.post('http://jboss.ddns.me:6061/remover', { "codigo": dadosSocio.CODIGO})
                .then(res => handleRemocao(res))
        }

    }

    function handleRemocao(res){
        if (res.data.Status === 'Removido')
            setRemocaoSuccess(true)
        else {
            setRemocaoFail(true)
        }
    }



    return (
        <div className='container-fluid d-flex flex-column align-items-center' style={{ marginTop: '70px' }}>
            <div className='titulo w-100 mb-4'>
                <h2 className='mb-0 fw-bolder'>REMOÇÃO</h2>
                <p className='text-muted border-bottom mb-0'>Insira o CPF do associado que deseja remover da plataforma de reconhecimento.</p>
            </div>

            {etapaCad === 1 ? <Etapa1></Etapa1> : <></>}

            {etapaCad === 2 ? <Etapa2></Etapa2> : <></>}

            <Modal fade={false} fullscreen isOpen={remocaoSuccess}>
                <ModalHeader style={{ backgroundColor: '#198754', color: '#FFF' }}>
                    <strong>REMOÇÃO EFETUADA</strong>
                </ModalHeader>
                <ModalBody>
                    Sócio removido da plataforma de Reconhecimento Facial

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => {
                            setRemocaoSuccess(false)
                            window.location.href = "/"
                        }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>

            <Modal fade={false} fullscreen isOpen={remocaoFail}>
                <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                    <strong>FALHA NA REMOÇÃO</strong>
                </ModalHeader>
                <ModalBody>
                    <p>Nenhuma alteração efetuada</p>

                    <ModalFooter className='mt-3 justify-content-center'>
                        <button className='btn btn-primary' onClick={() => { setRemocaoFail(false) }}>
                            CONFIRMAR
                        </button>
                    </ModalFooter>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default Remocao