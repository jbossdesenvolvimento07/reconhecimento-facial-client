import React from 'react'
import axios from 'axios'



function Consulta() {
    const [associados, setAssociados] = React.useState([])
    const [tipoFiltro, setTipoFiltro] = React.useState('nome')

    function clearInp() {
        const inpValor = document.getElementById('inpValor')
        inpValor.value = ''
    }
    function getAssociados() {

        const inpValor = document.getElementById('inpValor')
        let filtro = ''

        if (inpValor.value === '') {
            document.getElementById('erroValor').classList.remove('d-none')
            return
        } else {
            document.getElementById('erroValor').classList.add('d-none')
        }

        switch (tipoFiltro) {
            case 'nome':
                filtro = `WHERE a.NOME LIKE '%${inpValor.value}%'`
                break;

            case 'cpf':
                filtro = `WHERE dbo.ExtractInteger(a.CPF) = '${inpValor.value}'`
                break;

            case 'cod':
                filtro = `WHERE a.CODIGO = ${inpValor.value}`
                break;

            case 'cota':
                filtro = `WHERE a.TITULO = ${inpValor.value}`
                break;

            default:
                break;
        }

        axios.post(`${process.env.REACT_APP_ENDERECO_API}/getAssociados`, { "filtro": filtro })
            .then((res) => {

                setAssociados(res.data)
                console.log(res.data)

            })
    }

    function ListaAssociados() {
        let elements = []

        if (associados.length > 0) {

            associados.forEach(associado => {
                elements.push(

                    <div className="card mb-3" style={{ minWidth: '100%' }} key={associado.id}>
                        <div className="card-body">
                            <h5 className="card-title mb-0">{associado.NOME}</h5>
                            {associado.statusRF === 'A' ? <small style={{ color: '#198754' }}><i className="bi bi-check-square"></i>&nbsp;RECONHECIMENTO FACIAL</small> : <small style={{ color: '#dc3545' }}><i className="bi bi-x-square"></i>&nbsp;RECONHECIMENTO FACIAL</small>}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>CPF:</strong> {associado.CPF}</li>
                            <li className="list-group-item"><strong>Código:</strong> {associado.CODIGO}</li>
                            {associado.NOME_TITU ? <li className="list-group-item"><strong>Nome Titular: </strong> {associado.NOME_TITU}</li> : <></>}
                            <li className="list-group-item"><strong>Cota:</strong> {associado.TITULO}</li>
                            <li className="list-group-item"><strong>N° Carteirinha:</strong> {associado.CARTEIRINHA}</li>

                        </ul>
                        {associado.INADIMPLENTE !== 'N' ? <div className='inadimplente p-1'>INADIMPLENTE</div> : <div className='liberado p-1'>LIBERADO</div>}
                    </div>

                )
            })
        } else {
            elements.push(
                <div className="card" key={Math.random()}>
                    <div className="card-header fw-bolder" style={{ backgroundColor: '#dc3545', color: '#FFF' }}>
                        NENHUM RESULTADO
                    </div>
                    <div className="card-body">
                        <p className="card-text">Verifique se os filtros foram configurados corretamente.</p>

                    </div>
                </div>
            )

        }

        return elements
    }



    return (
        <div className='container-fluid d-flex flex-column align-items-center' style={{ marginTop: '70px' }}>

            <div className='titulo w-100 mb-4'>
                <h2 className='mb-0 fw-bolder'>CONSULTA</h2>
                <p className='text-muted border-bottom mb-0'>Selecione o tipo da consulta e preencha o campo.</p>
            </div>

            <h4>PESQUISA POR:</h4>
            <div className="btn-group" role="group">

                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => { setTipoFiltro('nome'); clearInp() }} defaultChecked />
                <label className="btn btn-outline-secondary" htmlFor="btnradio1">Nome</label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => { setTipoFiltro('cpf'); clearInp() }} />
                <label className="btn btn-outline-secondary" htmlFor="btnradio2">CPF</label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => { setTipoFiltro('cod'); clearInp() }} />
                <label className="btn btn-outline-secondary" htmlFor="btnradio3">Código</label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => { setTipoFiltro('cota'); clearInp() }} />
                <label className="btn btn-outline-secondary" htmlFor="btnradio4">Cota</label>

            </div>

            <div className="my-3">
                <label className="form-label mb-0">Insira o valor</label>
                <input type="text" className="form-control" id="inpValor" />
                <label id='erroValor' className='d-none' style={{ color: '#dc3545' }}>Campo obrigatório</label>
            </div>

            <button onClick={getAssociados} className='btn btn-success' >BUSCAR</button>

            <div className='titulo w-100 my-4 border-bottom'>
            </div>
            <ListaAssociados></ListaAssociados>
        </div>
    )
}

export default Consulta