import React, { useContext } from 'react'
import './Register.css'
import iconBed from '../../assets/iconBed.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
    const cliente = {
        "user": null,
        "nome": null,
        "nacionalidade": null,
        "dataDeNascimento": null,
        "endereco": "",
        "telefone": null,
        "rg": null,
        "dataRG": null,
        "email": null,
        "numeroCartao": null
    }
    const { signUp } = useContext(AuthContext);

    const handleUserName = (e) => {
        cliente.user = e.target.value
    }
    const handleNome = (e) => {
        cliente.nome = e.target.value
    }
    const handleEmail = (e) => {
        cliente.email = e.target.value
    }
    const handleNascimento = (e) => {
        cliente.dataDeNascimento = e.target.value
    }
    const handleNacionalidade = (e) => {
        cliente.nacionalidade = e.target.value
    }
    const handleEndereco = (e) => {
        cliente.endereco = e.target.value
    }
    const handleTelefone = (e) => {
        cliente.telefone = e.target.value
    }
    const handleRG = (e) => {
        cliente.rg = e.target.value
    }
    const handleDataRg = (e) => {
        cliente.dataRG = e.target.value
    }

    function checkCliente() {
        if (cliente.nome != null) {
            if (cliente.user != null) {
                if (cliente.nacionalidade != null) {
                    if (cliente.dataDeNascimento != null) {
                        if (cliente.endereco != null) {
                            if (cliente.telefone) {
                                if (cliente.rg) {
                                    if (cliente.dataRG) {
                                        return true
                                    } else {
                                        return "Informe a data de expedição do seu RG"
                                    }
                                } else {
                                    return "Informe registro geral"
                                }
                            } else {
                                return "Informe seu telefone"
                            }
                        } else {
                            return "Informe seu endereço"
                        }
                    } else {
                        return "Informe uma data de nascimento"
                    }
                } else {
                    return 'Informe seu UserName'
                }
            } else {
                return "Informe sua nacionalidade"
            }
        } else {
            return "Informe um nome de cliente valido"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const response = checkCliente()
        if (response === true) {
            signUp(cliente)

        } else {
            alert(response)
        }
    }

    return (
        <div id='containerLogin'>
            <div className='cardForm'>
                <Link to='/'>
                    <h1>HOTELARIAS IFBA</h1>
                </Link>
                <img clasName='iconBed' src={iconBed} alt='Logo Cama' />
                <Form className='formLogin' onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasic">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" placeholder="Enter yout username" onChange={handleUserName} />
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Informe seu nome" onChange={handleNome} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                        <Form.Text className="text-muted">
                            Caso voce informe um email, sua senha sera enviada para o email infromado
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Nacionalidade</Form.Label>
                        <Form.Control type="text" placeholder="Informe sua nacionalidade" onChange={handleNacionalidade} />
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control type="date" placeholder="Informe sua data de nascimento" onChange={handleNascimento} />
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control type="text" placeholder="Informe seu endereço" onChange={handleEndereco} />
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="Informe seu telefone" onChange={handleTelefone} />
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Registro Geral</Form.Label>
                        <Form.Control type="number" placeholder="Informe seu numero de RG ou Passaporte" onChange={handleRG} />
                        <Form.Text className="text-muted">
                            Sem . ou -
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Data RG</Form.Label>
                        <Form.Control type="date" placeholder="Informe a data de expedição do seu passaporte" onChange={handleDataRg} />
                    </Form.Group>
                    <Form.Group className='groupButtons'>
                        <Button variant="success" type="submit">
                            Registrar
                        </Button>
                        <Link to='/Login'>
                            <Button variant="secondary" type="button">
                                Logar
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}