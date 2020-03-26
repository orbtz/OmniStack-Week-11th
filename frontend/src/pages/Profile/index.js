import React, {useState, useEffect} from 'react';
import './style.css';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

//Importando o módulo que trata alguns dados de API, como a rota
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //Vai chamar uma função apenas quando algo mudar, conforme dito no segundo parâmetro
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //Função para deletar caso
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                Authorization: ongId,}
            });

            // Vai fazer varredura. Deta forma, o ID que não existe some da tela
            setIncidents(incidents.filter(incidents => incidents.id !== id) );
        } catch (error) {
            alert("Erro ao deletar o caso!");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="be the hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incident/new" >Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                        .format( incidents.value) }
                    </p>

                    <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>

    )
}