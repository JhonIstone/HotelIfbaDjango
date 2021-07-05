import React from 'react'
import { Switch } from "react-router-dom";
import Route from './Routes'

import MainScream from '../pages/MainScream/MainScream';
import Alojamento from '../pages/Alojamento/Alojamento'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Perfil from '../pages/perfil/Perfil'
import MyReservations from '../pages/myReservations/MyReservations'

export default function mainRoutes() {
    return (
        <Switch>
            <Route exact path="/" component={MainScream} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route isPrivate exact path="/Catalogo" component={MainScream} />
            <Route isPrivate exact path="/Perfil/myReservations" component={MyReservations} />
            <Route isPrivate exact path="/Alojamento/:id" component={Alojamento} />
            <Route isPrivate exact path="/Perfil/:nome" component={Perfil} />
        </Switch>
    );
}