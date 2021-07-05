import React, { useEffect, useState } from 'react'
import './Alojamento.css'
import http from '../../httpCommon'
import Button from 'react-bootstrap/Button'
import Navbar from '../../components/Navbar/Navbar'
import Form from 'react-bootstrap/Form'
import httpCommon from '../../httpCommon'

export default function Alojamento(props) {

    const [alojamento, setAlojamento] = useState({})
    const [servicos, setServicos] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [idUsuario, setIdUsuario] = useState([{}])

    var reserva = {
        "dataInicio": null,
        "dataFim": null,
        "formaDePagamento": null,
        "status": "Reservado",
        "cliente": idUsuario[0].id,
        "alojamento": alojamento.id,
        "servico": null
    }

    async function loadAlojamento() {
        await http.get("alojamento/" + props.match.params.id + "/")
            .then((response) => {
                setAlojamento(response.data)
            })
            .catch(erro => console.log(erro))
    }

    async function loadServicos() {
        await http.get('tiposervico/')
            .then((response) => {
                setServicos(response.data)
            })
            .catch(error => alert(error))
    }

    function loadCurrentUser() {
        const isUser = localStorage.getItem('userData')
        if (isUser) {
            setCurrentUser(JSON.parse(isUser))
        }
    }

    const handleDateFim = (e) => {
        console.log(e.target.value)
        reserva.dataFim = e.target.value
    }
    const handleDateInitial = (e) => {
        console.log(e.target.value)
        reserva.dataInicio = e.target.value
    }
    const handlePagamento = (e) => {
        console.log(e.target.value)
        reserva.formaDePagamento = e.target.value
    }
    const handleServico = (e) => {
        console.log(e.target.value)
        reserva.servico = e.target.value
    }

    function checkReserva() {
        if (reserva.dataInicio != null) {
            if (reserva.dataFim != null) {
                if (reserva.formaDePagamento != null) {
                    if (reserva.formaDePagamento.includes('Cartao')) {
                        if (idUsuario[0].numeroCartao != null) {
                            return true
                        } else {
                            alert('Cartão não informado, complete seu cadastro na tela de perfil')
                        }
                    } else {
                        return true
                    }
                } else {
                    alert("Informe uma forma de pagamento")
                }
            } else {
                alert("Data Fim invalida")
            }
        } else {
            alert("Data inicio invalida")
        }
        return false
    }

    function loadIDUsuario() {
        if (currentUser.username) {
            httpCommon.get(`cliente/?user=${currentUser.username}`)
                .then((response) => {
                    setIdUsuario(response.data)
                })
                .catch(error => console.log(error))
        }
    }

    function setReservado() {
        const data = { "status": "Indisponivel" }

        http.patch(`alojamento/${alojamento.id}/`, data)
            .then(() => {

            })
            .catch(error => console.log(error))
    }

    function sendRequest() {
        if (checkReserva() == true) {
            http.post('reserva/', reserva)
                .then(() => {
                    alert("Reserva Feita com Sucesso")
                    setReservado()
                })
                .catch(error => {
                    console.log(reserva)
                    alert(error)
                })
        } else {
            alert("Preencha os campos adequadamente")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest()
    }

    useEffect(() => {
        loadCurrentUser()
        loadAlojamento()
        loadServicos()
    }, [])

    useEffect(() => {
        loadIDUsuario()
    }, [currentUser])

    return (
        <>
            <Navbar />
            <div className='containerAlojamento'>
                <div className='lateralHeader'>
                    <h1>{alojamento.descricao}</h1>
                    <img src={alojamento.foto} alt="imagem quarto" className='imageAlojamento' />
                </div>
                <div className='descriptions'>
                    <h3>{alojamento.descricao}</h3>
                    <h4>Status: {alojamento.status}</h4>
                    <h4>Diaria: R${alojamento.diaria}</h4>
                    <h4>Quarto para {alojamento.capacidade} {alojamento.capacidade == Number(1) ? 'pessoa' : 'pessoas'}</h4>
                    <br></br>
                    {
                        alojamento.status === 'Disponivel' ?
                            <>
                                <h5>Deseja fazer uma reserva para esse quarto?</h5>
                                <Form className='formPerfil' onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" value={currentUser.username} disabled />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Data Inicio</Form.Label>
                                        <Form.Control type="date" placeholder="dd/mm/aaaa" onChange={handleDateInitial} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Data Fim</Form.Label>
                                        <Form.Control type="date" placeholder="dd/mm/aaaa" onChange={handleDateFim} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Meio de Pagamento</Form.Label>
                                        <Form.Control as="select" onChange={handlePagamento}>
                                            <option value={null}></option>
                                            <option value="Cartao_Debito">Cartão de Debito</option>
                                            <option value="Cartao_Credito">Cartão Credito</option>
                                            <option value="A Vista">A Vista</option>
                                            <option value="Cheque">Cheque</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Algum serviço?</Form.Label>
                                        <Form.Control as="select" onChange={handleServico}>
                                            <option value={null}></option>
                                            {servicos.map((servico) => {
                                                return <option value={servico.id}>{servico.servico}</option>
                                            })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="success" type='submit'>Fazer Reserva</Button>
                                </Form>
                            </>
                            :
                            <h1>Quarto não esta diponivel</h1>
                    }
                </div>
            </div>
        </>
    )
}