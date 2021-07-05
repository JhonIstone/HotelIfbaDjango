import React, { useState, useContext } from 'react'
import './Login.css'
import iconBed from '../../assets/iconBed.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(email, password)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div id='containerLogin'>
            <div className='cardForm'>
                <Link to='/'>
                    <h1>HOTELARIAS IFBA</h1>
                </Link>
                <img clasName='iconBed' src={iconBed} alt='Logo Cama' />
                <Form className='formLogin' onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={handleEmail} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Form.Group className='groupButtons'>
                        <Button variant="success" type="submit">
                            Entrar
                        </Button>
                        <Link to='/Register'>
                            <Button variant="danger" type="button">
                                Registrar
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}