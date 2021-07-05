import React, { useEffect, useState, createContext } from 'react'
import './Filter.css'
import Button from 'react-bootstrap/Button'
import httpCommon from '../../httpCommon'

export const filterContext = createContext({});

export default function Filter({ children }) {

    const [listEmpresas, setListaEmpresas] = useState('')
    const [listServicos, setlistServicos] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [servicos, setServicos] = useState([])

    function removeFilterEmpresa(empresa) {
        const newArray = listEmpresas
        newArray.splice(newArray.indexOf(empresa), 1)
        setListaEmpresas(newArray)
    }

    function addFilterEmpresa(empresa) {
        setListaEmpresas([...listEmpresas, empresa])
    }

    const handleEmpresa = (e) => {
        if (listEmpresas.includes(e.target.value))
            removeFilterEmpresa(e.target.value)
        else
            addFilterEmpresa(e.target.value)
    }

    function removeFilterServico(servico) {
        const newArray = listServicos
        newArray.splice(newArray.indexOf(servico), 1)
        setlistServicos(newArray)
    }

    function addFilterServico(servico) {
        setlistServicos([...listServicos, servico])
    }

    const handleServico = (e) => {
        if (listServicos.includes(e.target.value))
            removeFilterServico(e.target.value)
        else
            addFilterServico(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(listEmpresas)
        console.log(listServicos)
    }

    function loadEmpresas() {
        httpCommon.get('empresa/')
            .then((response) => {
                setEmpresas(response.data)
            })
            .catch(error => console.log(error))
    }

    function loadServicos() {
        httpCommon.get(`tiposervico/`)
            .then((response) => {
                setServicos(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        loadEmpresas()
        loadServicos()
    }, [])

    return (
        <div className='containerFilter'>
            <h1>Filtro</h1>
            <form className='formFilter' onSubmit={handleSubmit}>
                <strong>Empresas</strong>
                {
                    empresas.length ?
                        empresas.map((empresa, index) => {
                            return (
                                <div className='empresa'>
                                    <input type='checkBox' id={`checkEmpresa${index}`} name='checkEmpresa1' value={empresa.id} onChange={handleEmpresa} />
                                    <label from={`checkEmpresa${index}`}>{empresa.empresa}</label>
                                </div>
                            )
                        })
                        :
                        <h1>Não ha empresas cadastradas</h1>
                }
                <strong>Serviços</strong>
                {
                    servicos.length ?
                        servicos.map((servico, index) => {
                            return (
                                <div className='servico'>
                                    <input type='checkBox' id={`checkServico${index}`} name='checkServico1' value={servico.id} onChange={handleServico} />
                                    <label from={`checkServico${index}`}>{servico.servico}</label>
                                </div>
                            )
                        })
                        :
                        <h1>Não ha servicos cadastrados</h1>
                }
                <Button variant="info" type="submit" className='submitButton'>Filtrar</Button>
            </form>
        </div>
    )
}