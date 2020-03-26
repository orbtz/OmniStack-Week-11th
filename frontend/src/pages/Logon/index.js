import React, {useState} from 'react';

//Modulo usado para trocar o conteúdo da página SEM recarregar o react inteiro. Substitui elemento <a>
import { Link, useHistory } from 'react-router-dom';

//Importando o material design. No caso, o ícone de fazer cadastro
import { FiLogIn } from 'react-icons/fi'

//Importando o módulo que trata alguns dados de API, como a rota
import api from '../../services/api';

import './style.css'

import logoImg from "../../assets/logo.svg"
import heroesImg from "../../assets/heroes.png"

export default function Logon(){
    const [id, setId] = useState('');
    const hystory = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            hystory.push('/profile');
        } catch (error) {
            alert ('Falha no login. Tente novamente!');
        }
    }

    return(
        
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="be the hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Login</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#302041" />  Não tenho cadastro!
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>

    );
}