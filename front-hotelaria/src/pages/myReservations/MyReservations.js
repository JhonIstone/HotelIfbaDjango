import React, { useEffect, useState } from 'react'
import './MyReservations.css'
import httpCommon from '../../httpCommon'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Navbar from '../../components/Navbar/Navbar'

export default function MyReservations() {
    const [reservas, setReservas] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [idUsuario, setIdUsuario] = useState([{}])

    function loadCurrentUser() {
        const isUser = localStorage.getItem('userData')
        if (isUser) {
            setCurrentUser(JSON.parse(isUser))
        }
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

    function loadReservas() {
        httpCommon.get(`reserva/?cliente=${idUsuario[0].id}`)
            .then((response) => {
                setReservas(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        loadCurrentUser()
    }, [])

    useEffect(() => {
        loadIDUsuario()
    }, [currentUser])

    useEffect(() => {
        loadReservas()
    }, [idUsuario])

    function setDisponivel(id) {
        const data = { "status": "Disponivel" }

        httpCommon.patch(`alojamento/${id}/`, data)
            .then(() => {

            })
            .catch(error => console.log(error))
    }

    function cancelReserva(id, alojamento) {
        httpCommon.delete(`reserva/${id}/`)
            .then(() => {
                loadReservas()
                setDisponivel(alojamento)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Navbar />
            <div className='containerMyreservations'>
                <h1>Reservas</h1>
                <div className='constainerCards'>
                    {reservas.length ?
                        reservas.map((reserva) => {
                            return (
                                <Card style={{ width: '18rem' }} className='card'>
                                    <Card.Img variant="top" src='' />
                                    <Card.Body>
                                        <Card.Title>{reserva.status}</Card.Title>
                                        <Card.Text>
                                            {`Reserva do dia ${reserva.dataInicio} ao dia ${reserva.dataFim} pago via ${reserva.formaDePagamento}`}
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => cancelReserva(reserva.id, reserva.alojamento)}>Anular</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                        :
                        <h4>Voce não tem reservas ainda!</h4>
                    }
                </div>
            </div>
        </>
    )
}