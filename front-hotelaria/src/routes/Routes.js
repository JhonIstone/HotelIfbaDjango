import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function RouteWraper(
    {
        component: Component,
        isPrivate,
        ...rest
    }
) {

    const { signed } = useContext(AuthContext);

    if (!signed && isPrivate) {
        return (
            <Redirect to="/Login" />
        );
    }

    if (signed && (!isPrivate)) {
        return (
            <Redirect to="/Catalogo" />
        );
    }

    return (
        <Route
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    );
}