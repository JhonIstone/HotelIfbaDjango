import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Perfil.css'
import Navbar from '../../components/Navbar/Navbar'
import httpCommon from '../../httpCommon'

export default function Perfil() {

    const [currentUser, setCurrentUser] = useState('')
    const [idUsuario, setIdUsuario] = useState([{}])

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [nacionalidade, setNacionalidade] = useState()
    const [dataDeNascimento, setDataNascimento] = useState()
    const [endereco, setEndereco] = useState()
    const [telefone, setTelefone] = useState()
    const [rg, setRg] = useState()
    const [dataRG, setDataRg] = useState()
    const [numeroCartao, setNumeroCartao] = useState()

    var cliente =
    {
        "nome": nome,
        "nacionalidade": nacionalidade,
        "dataDeNascimento": dataDeNascimento,
        "endereco": endereco,
        "telefone": telefone,
        "rg": rg,
        "dataRG": dataRG,
        "email": email,
        "numeroCartao": numeroCartao
    }

    const handleNome = (e) => {
        setNome(e.target.value)
        cliente.nome = e.target.value
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
        cliente.email = e.target.value
    }
    const handleNacionalidade = (e) => {
        setNacionalidade(e.target.value)
        cliente.nacionalidade = e.target.value
    }
    const handleDataNascimento = (e) => {
        setDataNascimento(e.target.value)
        cliente.dataDeNascimento = e.target.value
    }
    const handleEndereço = (e) => {
        setEndereco(e.target.value)
        cliente.endereco = e.target.value
    }
    const handleTelefone = (e) => {
        setTelefone(e.target.value)
        cliente.telefone = e.target.value
    }
    const handleRg = (e) => {
        setRg(e.target.value)
        cliente.rg = e.target.value
    }
    const handleDataRg = (e) => {
        setDataRg(e.target.value)
        cliente.dataRG = e.target.value
    }
    const handleNumeroCartão = (e) => {
        setNumeroCartao(e.target.value)
        cliente.numeroCartao = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        httpCommon.patch(`cliente/${idUsuario[0].id}/`, cliente)
            .then(() => {
                alert('Usuario alterado com sucesso')
            })
            .catch(error => alert(error))
    }

    function loadCurrentUser() {
        const isUser = localStorage.getItem('userData')
        if (isUser) {
            setCurrentUser(JSON.parse(isUser))
        }
    }
    function loadForms() {
        setNome(idUsuario[0].nome)
        setEmail(idUsuario[0].email)
        setNacionalidade(idUsuario[0].nacionalidade)
        setDataNascimento(idUsuario[0].dataDeNascimento)
        setEndereco(idUsuario[0].endereco)
        setTelefone(idUsuario[0].telefone)
        setRg(idUsuario[0].rg)
        setDataRg(idUsuario[0].dataRG)
        setNumeroCartao(idUsuario[0].numeroCartao)
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
    useEffect(() => {
        loadCurrentUser()
    }, [])

    useEffect(() => {
        loadIDUsuario()
    }, [currentUser])

    useEffect(() => {
        loadForms()
    }, [idUsuario])

    return (
        <>
            <Navbar />
            <div id='containerPerfil'>
                <h1>Perfil</h1>
                <Form onSubmit={handleSubmit} className='formPerfil'>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Seu Nome" value={nome} onChange={handleNome} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nacionalidade</Form.Label>
                        <Form.Control type="text" placeholder="Sua Nacionalidade" value={nacionalidade} onChange={handleNacionalidade} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Endereco</Form.Label>
                        <Form.Control type="text" placeholder="Seu Endereço" value={endereco} onChange={handleEndereço} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data Nascimento</Form.Label>
                        <Form.Control type="date" placeholder="Sua data de nascimento" value={dataDeNascimento} onChange={handleDataNascimento} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="Telefone" value={telefone} onChange={handleTelefone} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Registro Geral</Form.Label>
                        <Form.Control type="text" placeholder="seu RG" value={rg} onChange={handleRg} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data RG</Form.Label>
                        <Form.Control type="date" placeholder="Data do seu RG" value={dataRG} onChange={handleDataRg} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cartão de Credito</Form.Label>
                        <Form.Control type="number" placeholder="Numero do cartão cadastrado" value={numeroCartao} onChange={handleNumeroCartão} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Atualizar Perfil
                    </Button>
                </Form>
            </div>
        </>
    )
}