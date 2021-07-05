import { useState, createContext, useEffect } from 'react'
import axios from 'axios';
import httpCommon from '../httpCommon'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        function loadUser() {
            const storageUser = localStorage.getItem('usuarioLogado')
            if (storageUser)
                setUser(JSON.parse(storageUser))
        }
        loadUser()
    }, [])

    function signUp(cliente) {
        httpCommon.post('cliente/', cliente)
            .then(() => {
                alert("Conta criada")
                if (cliente.email === null)
                    alert("Sua senha é seu nome informado+12345678")
            })
            .catch((error) => alert(error))
    }

    function loadUser(username) {
        const token = localStorage.getItem('auth-token-access')
        const data = ''
        const config = {
            method: 'get',
            url: `https://luisco123.pythonanywhere.com/users/?username=${username}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: data
        }

        axios(config)
            .then(function (response) {
                console.log(response.data);
                const data = response.data[0]
                localStorage.setItem('userData', JSON.stringify(data))
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    function signIn(username, password) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json',
            }
        };
        fetch('https://luisco123.pythonanywhere.com/api/token/', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.log(response);
                    throw new Error('Usuário ou senha inválidos, tente novamente');
                }
            })
            .then(token => {
                setUser(token)
                setLocalUser(token);
                const token_list = JSON.parse(token);
                localStorage.setItem('auth-token-access', token_list["access"]);
                localStorage.setItem('auth-token-refresh', token_list["refresh"]);
                loadUser(username)
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    async function signOut() {
        localStorage.removeItem('auth-token-access');
        localStorage.removeItem('auth-token-refresh');
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('userData');
        window.location.reload();
    }

    function setLocalUser(data) {
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            signOut,
            setUser,
            setLocalUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;