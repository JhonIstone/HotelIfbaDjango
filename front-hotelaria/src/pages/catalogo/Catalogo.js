import React, { useEffect, useState } from 'react'
import './Catalogo.css'
import { Link } from 'react-router-dom'
import http from '../../httpCommon'
import Button from 'react-bootstrap/Button'
import httpCommon from '../../httpCommon'
import '../../components/Filter/Filter.css'

export default function Catalogo() {

    const [alojamentos, setAlojamentos] = useState([])

    const [selectEmpresa, setSelectEmpresas] = useState('')
    const [selectServico, setSelectServicos] = useState('')
    const [empresas, setEmpresas] = useState([])
    const [servicos, setServicos] = useState([])

    const handleServico = (e) => {
        setSelectServicos(`servico=${e.target.value}`)
    }

    const handleEmpresa = (e) => {
        setSelectEmpresas(`empresa=${e.target.value}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectServico === '') {
            http.get(`alojamento/?${selectEmpresa}`)
                .then((response) => {
                    console.log("Apenas pela empresa")
                    setAlojamentos(response.data)
                })
                .catch(erro => console.log(erro))
        } else if (selectEmpresa !== '' && selectServico !== '') {
            http.get(`listadeservico/?${selectServico}&${selectEmpresa}`)
                .then((response) => {
                    const result = response.data
                    if (result.length) {
                        http.get(`alojamento/?${selectEmpresa}`)
                            .then((response) => {
                                setAlojamentos(response.data)
                            })
                            .catch(erro => console.log(erro))
                    } else {
                        setAlojamentos([])
                    }
                })
                .catch(error => console.log(error))
        } else {
            http.get(`listadeservico/?${selectServico}`)
                .then((response) => {
                    const result = response.data
                    if (result.length > 0) {
                        const list = []
                        result.forEach((lista) => {
                            console.log(`alojamento/?empresa=${lista.empresa}`)
                            http.get(`alojamento/?empresa=${lista.empresa}`)
                                .then((response) => {
                                    response.data.map((alojamento) => {
                                        list.push(alojamento)
                                        console.log(alojamento)
                                    })
                                })
                                .catch(error => console.log(error))
                        })
                        setTimeout(() => {
                            setAlojamentos(list)
                        }, 500)
                    } else {
                        setAlojamentos([])
                    }
                })
        }
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

    async function loadAlojamentos() {
        await http.get('alojamento/')
            .then((response) => {
                setAlojamentos(response.data)
            })
            .catch(erro => console.log(erro))
    }

    useEffect(() => {
        loadAlojamentos()
        loadEmpresas()
        loadServicos()
    }, [])

    return (
        <>
            <div className='mainContainer'>
                <div className='containerFilter'>
                    <h1>Filtro</h1>
                    <form className='formFilter' onSubmit={handleSubmit}>
                        <strong>Empresas</strong>
                        {
                            empresas.length ?
                                empresas.map((empresa, index) => {
                                    return (
                                        <div className='empresa'>
                                            <input type='radio' id={`checkEmpresa${index}`} name='checkEmpresa1' value={empresa.id} onChange={handleEmpresa} />
                                            <label from={`checkEmpresa${index}`}>{empresa.empresa}</label>
                                        </div>
                                    )
                                })
                                :
                                <spam>Não ha empresas cadastradas</spam>
                        }
                        <strong>Serviços</strong>
                        {
                            servicos.length ?
                                servicos.map((servico, index) => {
                                    return (
                                        <div className='servico'>
                                            <input type='radio' id={`checkServico${index}`} name='checkServico1' value={servico.id} onChange={handleServico} />
                                            <label from={`checkServico${index}`}>{servico.servico}</label>
                                        </div>
                                    )
                                })
                                :
                                <spam>Não ha servicos cadastrados</spam>
                        }
                        <Button variant="info" type="submit" className='submitButton'>Filtrar</Button>
                    </form>
                </div>
                <div className='containerAlojamentos'>
                    {alojamentos.length ?
                        alojamentos.map((alojamento) => {
                            if (alojamento.status === 'Disponivel') {
                                return (
                                    <Link to={"/Alojamento/" + alojamento.id} className='linkAlojamento'>
                                        <div className='alojamento'>
                                            <strong>{alojamento.descricao}</strong>
                                            <img src={alojamento.foto} alt='Imagem do Quarto' className='imagemQuarto' />
                                            <strong>Diaria: {alojamento.diaria} Reais</strong>
                                        </div>
                                    </Link>
                                )
                            } else {
                                return null
                            }
                        })
                        :
                        <h1>Não ha quartos com esses parametros</h1>
                    }
                </div>
            </div>
        </>
    )
}