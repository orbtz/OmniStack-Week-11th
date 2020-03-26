import React from 'react';

//Modulo que vai brincar com o roteamento das páginas que iremos criar
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    //BrowserRouter - Obrigatório para rodar
    //Switch - Garante que vai chamar apenas uma página
    //Route - O caminho da rota. Contém como é achado no endereço, e qual a página chamada
    return(

        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/incident/new' component={NewIncident} />
            </Switch>
        </BrowserRouter>

    );
}