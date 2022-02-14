import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { Progress } from 'reactstrap';


function Cadastro() {

    const [etapaCad, setEtapaCad] = React.useState(1)
    const [progressoFotos, setProgressoFotos] = React.useState(0)

    useEffect(() => {
        console.log(progressoFotos)
    }, [progressoFotos])

    const [cpf, setCpf] = React.useState('')
    const [dataUrls, setDataUrls] = React.useState(['', '', '', '', ''])


    function Etapa1() {
        return (
            <>
                <div className='my-3'>
                    <label className="form-label mb-0">CPF</label>
                    <input type="text" className="form-control" id="inpCPF" />
                </div>
                <button className="btn btn-success" id="btnSend" onClick={handleEtapa1}>CONTINUAR</button>
            </>
        )
    }

    function handleEtapa1() {

        setCpf(document.getElementById('inpCPF').value)

        setEtapaCad(2)

    }

    function Etapa2() {
        return (
            <>
                <div id='cardFoto1' className="mb-3 mx-5">
                    <h4 className='mt-2 mx-auto'>FOTO FRONTAL</h4>
                    <img src='assets/frente.png' className="card-img-top" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp1' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(1) }} ></input>
                        <label for='fileInp1' id="label1" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto2' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO LATERAL DIR.</h4>
                    <img src='assets/latDir.png' className="card-img-top" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp2' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(2) }}></input>
                        <label for='fileInp2' id="label2" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto3' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO LATERAL ESQ.</h4>
                    <img src='assets/latEsq.png' className="card-img-top" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp3' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(3) }}></input>
                        <label for='fileInp3' id="label3" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto4' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO CIMA</h4>
                    <img src='assets/cima.png' className="card-img-top" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp4' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(4) }}></input>
                        <label for='fileInp4' id="label4" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>


                <div id='cardFoto5' className="mb-3 mx-5 d-none">
                    <h4 className='mt-2 mx-auto'>FOTO BAIXO</h4>
                    <img src='assets/baixo.png' className="card-img-top" alt='imgMissing' />
                    <div className="card-body text-start">
                        <input id='fileInp5' className="inputFile my-3" type="file" accept="image/*" capture="camera" onChange={() => { loadImage(5) }}></input>
                        <label for='fileInp5' id="label5" className='labelFileInp'> ANEXAR FOTO <i className="ms-2 bi-camera-fill fs-1"></i> </label>
                    </div>
                </div>

                <button className="btn btn-success d-none" id="btnCadastrar" onClick={() => { }}>CADASTRAR</button>
            </>
        )
    }

    function ProgressBar() {
        return(
            <div className='d-block mb-3' style={{width: '80%'}}>
                <Progress
                    max="5"
                    color="primary"
                    value={progressoFotos}
                />
            </div>
        )
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

                canvas.width = imageObj.width * 0.2
                canvas.height = imageObj.height * 0.2

                ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);


                dataUlrsTemp[nInput - 1] = canvas.toDataURL()

                setDataUrls(dataUlrsTemp)

                //console.log(dataUrls)
            }
        }
        catch (err) {

            dataUlrsTemp[nInput - 1] = ''

            setDataUrls(dataUlrsTemp)

            //console.log(dataUrls)
        }


        if (nInput != 5) {

            if (imgFile) {
                const cardAtual = document.getElementById(`cardFoto${nInput}`)
                const cardNext = document.getElementById(`cardFoto${nInput + 1}`)

                cardAtual.classList.add('d-none')
                cardNext.classList.remove('d-none')


                //setProgressoFotos(nInput)
                
            }


        } else {
            if (imgFile)
                document.getElementById('btnCadastrar').classList.remove('d-none')
        }


    }






    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', minHeight: '100vh' }}>

            {etapaCad == 1 ? <Etapa1></Etapa1> : <></>}

            {etapaCad == 2 ? <ProgressBar></ProgressBar> : <></>}
            {etapaCad == 2 ? <Etapa2></Etapa2> : <></>}



            <NavLink className='btn btn-sm btn-outline-danger my-5' to="/">CANCELAR CADASTRO</NavLink>
        </div>
    )
}

export default Cadastro;