import React, {useState} from 'react';
import './style.css';

import logoImg from "../../assets/logo.svg";

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//Importando o módulo que trata alguns dados de API, como a rota
import api from '../../services/api';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');


    const hystory = useHistory();


    //Funcão que irá fazer o cadastro
    async function handleRegister(e){
        //Previne que a página recarregue ao clicar no submit
        e.preventDefault();

        const data = {name, email, whatsapp, city, uf}
        
        //Vai fazer a chamada API
        try {
            const response = await api.post('ongs', data);
            
            alert(`Seu ID de acesso: ${response.data.id}`);

            hystory.push('/');
        } catch (error) {
            alert(`Falha no cadastro. Tente novamente!`);
            
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="be the hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro, entre na plataforma!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#302041" />  Não tenho cadastro!
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" style={ {width: 80} }
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                        />

                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}