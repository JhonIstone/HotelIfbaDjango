import React, { useContext } from 'react'
import './Navbar.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function NavBar() {

    const { signOut } = useContext(AuthContext);
    const { signed } = useContext(AuthContext);

    return (
        <Navbar bg="dark" expand="lg" id='barra'>
            <div>
                <Link to='/'>
                    <Navbar.Brand><h2 className='title'>Hotelarias IFBA</h2></Navbar.Brand>
                </Link>
            </div>
            <div>
                <Nav className="mr-auto">
                    <DropdownButton
                        id="dropdown-button-drop-left"
                        drop="left"
                        variant="Light"
                        title="Perfil"
                    >
                        {signed ?
                            <>
                                <Dropdown.Item><Link to='/Perfil/usuario'>Perfil</Link></Dropdown.Item>
                                <Dropdown.Item><Link to='/Perfil/myReservations'>Minhas Reservas</Link></Dropdown.Item>
                                <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
                            </>
                            :
                            <>
                                <Dropdown.Item><Link to='/Login'>Login</Link></Dropdown.Item>
                                <Dropdown.Item><Link to='/Register'>Registrar</Link></Dropdown.Item>
                            </>
                        }
                    </DropdownButton>
                </Nav>
            </div>
        </Navbar>
    )
}