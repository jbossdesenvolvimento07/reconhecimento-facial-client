import React from 'react'
import './App.css';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function App() {


  const [imageSrc, setImageSrc] = React.useState('')
  const [imageDados, setImageDados] = React.useState([])

  const [imageCad1, setImageCad1] = React.useState('')
  const [imageCad2, setImageCad2] = React.useState('')

  const [modalLiberado, setModalLiberado] = React.useState(false)
  const [modalBloqueado, setModalBloqueado] = React.useState(false)
  const [modalNotFound, setModalNotFound] = React.useState(false)

  const [openCadastroSuccess, setCadastroSuccess] = React.useState(false)
  const [openCadastroFail, setCadastroFail] = React.useState(false)

  const [nomeSocio, setNomeSocio] = React.useState('')


  function handleClick(e) {

    console.log('Mandando requisição')
    let dataUrl
    let imgInput = document.getElementById('formFile')
    let imgFile = imgInput.files[0]

    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    let imageObj1 = new Image();

    let reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = function (e) {
      imageObj1.src = e.target.result
    }

    imageObj1.onload = function() {
        
      canvas.width = imageObj1.width * 0.2
      canvas.height = imageObj1.height * 0.2
      
      ctx.drawImage(imageObj1,0,0, canvas.width, canvas.height);

      dataUrl = canvas.toDataURL()

      
      axios.post('http://192.168.0.58:6061/validar', { "dataUrl": dataUrl })
      .then(res => liberacao(res))
    }

  }


  function liberacao(res) {
    console.log(res)

    setImageSrc(res.data[0]._originalSource)
    setImageDados([res.data[1][0]._label, res.data[1][0]._distance])

    setNomeSocio(res.data[1][0]._label)

    switch (res.data[1][0]._label) {
      case 'notFound':
        setModalNotFound(true)
        break;
      case 'unknown':
        setModalBloqueado(true)
        break;

      default:
        setModalLiberado(true)
        break;
    }

  }


  //var dataUrl1, dataUrl2
  const [dataUrl1, setDataUrl1] = React.useState('')
  const [dataUrl2, setDataUrl2] = React.useState('')

  function loadImage(input){
    if(input == '1'){

      let imgInputCadastro1 = document.getElementById('formFileCadastro1')
      let imgFile1 = imgInputCadastro1.files[0]

      let canvas1 = document.createElement('canvas')
      let ctx1 = canvas1.getContext('2d')

      let imageObj1 = new Image();

      let reader = new FileReader();
      reader.readAsDataURL(imgFile1);
      reader.onloadend = function (e) {
        imageObj1.src = e.target.result
      }
      imageObj1.onload = function() {
          
        canvas1.width = imageObj1.width * 0.2
        canvas1.height = imageObj1.height * 0.2
        
        ctx1.drawImage(imageObj1,0,0, canvas1.width, canvas1.height);

        //dataUrl1 = canvas1.toDataURL()
        setDataUrl1(canvas1.toDataURL())

      } 

    }else{

      let imgInputCadastro2 = document.getElementById('formFileCadastro2')
      let imgFile2 = imgInputCadastro2.files[0]

      let canvas2 = document.createElement('canvas')
      let ctx2 = canvas2.getContext('2d')

      let imageObj2 = new Image();

      let reader2 = new FileReader();
      reader2.readAsDataURL(imgFile2);
      reader2.onloadend = function (e) {
        imageObj2.src = e.target.result
      }
      imageObj2.onload = function() {
          
        canvas2.width = imageObj2.width * 0.2
        canvas2.height = imageObj2.height * 0.2
        
        ctx2.drawImage(imageObj2,0,0, canvas2.width, canvas2.height);

        //dataUrl2 = canvas2.toDataURL()
        setDataUrl2(canvas2.toDataURL())

      } 

    }
  }

  function handleClickCadastro() {

    let label
    let labelCadastro = document.getElementById('labelCadastro')
    label = labelCadastro.value

    axios.post('http://192.168.0.58:6061/cadastrar', { "label": label, "dataUrl1": dataUrl1, "dataUrl2": dataUrl2 })
      .then(res => cadastro(res))

    /*let dataUrl1, dataUrl2, label
    let labelCadastro = document.getElementById('labelCadastro')
    label = labelCadastro.value

    let imgInputCadastro1 = document.getElementById('formFileCadastro1')
    let imgFile1 = imgInputCadastro1.files[0]
    let imgInputCadastro2 = document.getElementById('formFileCadastro2')
    let imgFile2 = imgInputCadastro2.files[0]

    let canvas1 = document.createElement('canvas')
    let ctx1 = canvas1.getContext('2d')
    let canvas2 = document.createElement('canvas')
    let ctx2 = canvas2.getContext('2d')
    

    let imageObj1 = new Image();
    let imageObj2 = new Image();

    let reader = new FileReader();
    reader.readAsDataURL(imgFile1);
    reader.onloadend = function (e) {
      imageObj1.src = e.target.result
    }
    imageObj1.onload = function() {
        
      canvas1.width = imageObj1.width * 0.2
      canvas1.height = imageObj1.height * 0.2
      
      ctx1.drawImage(imageObj1,0,0, canvas1.width, canvas1.height);

      dataUrl1 = canvas1.toDataURL()

    } 

    let reader2 = new FileReader();
    reader2.readAsDataURL(imgFile2);
    reader2.onloadend = function (e) {
      imageObj2.src = e.target.result
    }
    imageObj2.onload = function() {
        
      canvas2.width = imageObj2.width * 0.2
      canvas2.height = imageObj2.height * 0.2
      
      ctx2.drawImage(imageObj2,0,0, canvas2.width, canvas2.height);

      dataUrl2 = canvas2.toDataURL()

      axios.post('http://192.168.0.58:6001/adicionar', { "label": label, "dataUrl1": dataUrl1, "dataUrl2": dataUrl2 })
      .then(res => cadastro(res))
    }*/

    
      
  }

  function cadastro(res) {
    console.log(res)
    setImageCad1(res.data[0][0])
    setImageCad2(res.data[0][1])

    if (res.data[1].Status === 'Cadastrado')
      setCadastroSuccess(true)
    else
      setCadastroFail(true)
  }



  function devTools(tool){
    switch (tool) {
      case 'salvar':
        axios.get('http://192.168.0.58:6001/salvar')
        .then(res => { console.log('Salvo')})
        break;
    
      case 'zerar':
        axios.get('http://192.168.0.58:6001/zerar')
        .then(res => { console.log('Zerado')})
        break;

      case 'carregar':
        axios.get('http://192.168.0.58:6001/carregar')
        .then(res => { console.log('Carregado')})
        break;
      default:
        break;
    }
  }


  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='row'>

          <div className='col-10 col-lg-4 mx-auto py-5'>

            <div className="card">
              <div className="card-header">
                VALIDAÇÃO
              </div>
              <div className="card-body">

                <input className="form-control mb-3" type="file" id="formFile" accept="image/*" capture="camera"></input>
                <button className="btn btn-outline-success" id="btnSend" onClick={handleClick}>VERIFICAR</button>

              </div>
            </div>
            
            <div className="card mt-3">
              <img src={imageSrc} className="card-img-top" />
              <div className="card-body text-start">
                <p className="card-text mb-0"><strong>Label:</strong> {imageDados[0]}</p>
                <p className="card-text"><strong>Distance:</strong> {imageDados[1]}</p>
              </div>
            </div>



          </div>



          <div className='col-10 col-lg-4 mx-auto py-5'>

            <div className="card">
              <div className="card-header">
                CADASTRO
              </div>
              <div className="card-body">
                <div className="mb-3">

                  <div className='mb-3 text-start'>
                    <label className="form-label mb-0">Nome</label>
                    <input type="text" className="form-control" id="labelCadastro" />
                  </div>

                  <input className="form-control mb-3" type="file" id="formFileCadastro1" accept="image/*" capture="camera" onChange={ () => {loadImage('1')} }></input>
                  <input className="form-control mb-3" type="file" id="formFileCadastro2" accept="image/*" capture="camera" onChange={ () => {loadImage('2')} }></input>
                  <button className="btn btn-outline-primary" id="btnSend" onClick={handleClickCadastro}>CADASTRAR</button>

                </div>
              </div>

            </div>

            

          </div>
        </div>


        <div className='row'>
          <div className='col-10 col-lg-4 mx-auto mt-5 pt-5 pb-2'>

            <Button color="danger" outline className='mb-3 mx-1' size="sm" onClick={() => { devTools('salvar') }}>
              Salvar faces em JSON
            </Button>
            <Button color="danger" outline className='mb-3 mx-1' size="sm" onClick={() => { devTools('carregar') }}>
              Carrega faces do JSON
            </Button>
            <Button color="danger" outline className='mb-3 mx-1' size="sm" onClick={() => { devTools('zerar') }}>
              Apagar faces carregadas
            </Button>
            
          </div>
          

        </div>

        <Modal fade={false} isOpen={modalLiberado}>
          <ModalHeader style={{ backgroundColor: '#198754', color: '#FFF' }}>
            <strong>ENTRADA LIBERADA</strong>
          </ModalHeader>
          <ModalBody>
            <p><strong>Sócio: </strong> {nomeSocio}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { setModalLiberado(false) }}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal fade={false} isOpen={modalBloqueado}>
          <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
            <strong>ENTRADA BLOQUEADA</strong>
          </ModalHeader>
          <ModalBody>
            Sócio não identificado
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { setModalBloqueado(false) }}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal fade={false} isOpen={modalNotFound}>
          <ModalHeader style={{ backgroundColor: '#ffc107', color: '#424242' }}>
            <strong>NÃO RECONHECIDO</strong>
          </ModalHeader>
          <ModalBody>
            Não foi possível identificar uma pessoa na foto, tente aproximar a câmera ou melhorar a iluminação.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { setModalNotFound(false) }}>
              OK
            </Button>
          </ModalFooter>
        </Modal>




        <Modal fade={false} isOpen={openCadastroSuccess}>
          <ModalHeader style={{ backgroundColor: '#198754', color: '#FFF' }}>
            <strong>CADASTRO EFETUADO</strong>
          </ModalHeader>
          <ModalBody>
            Sócio cadastrado
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { setCadastroSuccess(false) }}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        <Modal fade={false} isOpen={openCadastroFail}>
          <ModalHeader style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
            <strong>ERRO NO CADASTRO</strong>
          </ModalHeader>
          <ModalBody>
            <p>- Verifique se o nome foi preenchido corretamente</p>
            <p>- Verifique se a pessoa está visível nas fotos enviadas</p>

            <div className='container-fluid'>
              <div className='row'>
                <div className='col-6'>
                  <div className="card mt-3">
                    <img src={imageCad1} className="card-img-top" />
                    <div className="card-body text-start">
                      <p className="card-text mb-0">Imagem 1</p>
                    </div>
                  </div>

                </div>
                <div className='col-6'>
                  <div className="card mt-3">
                    <img src={imageCad2} className="card-img-top" />
                    <div className="card-body text-start">
                      <p className="card-text mb-0">Imagem 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { setCadastroFail(false) }}>
              OK
            </Button>
          </ModalFooter>
        </Modal>



      </div>
    </div>
  );
}

export default App;