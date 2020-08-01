import React, { useState, useEffect } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link,useHistory } from 'react-router-dom'; 
import api from '../../services/api';

export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);


    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName'); //pegara o setitem da index da logon e setara o nome salvo no local storage, na tela.

    useEffect(()=> {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data); 
        })
    }, [ongId]);

    //deletar

    async function handleDeleteIncidente(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));


        } catch {
            alert('erro ao deletar o caso')
        }
    }

    //logout no botao

    function handleLogout() {
        localStorage.clear(); // vai deslogar, entao precisa limpar os dados do localstorage primeiro pra dps deslogar.
        history.push('/')
    }


    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="logo"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                Cadastrar novo caso
                </Link>

                <button type="button" onClick={handleLogout}>Logout</button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidente => (
                <li key={incidente.id}>
                    <strong>CASO: </strong>
                    <p>{incidente.titulo}</p>

                    <strong>CASO: </strong>
                    <p>{incidente.descricao}</p>

                    <strong>valor : </strong>
                     <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidente.value)}</p>

                    <button 
                    type="button" 
                    onClick={()=> handleDeleteIncidente(incidente.id)}>
                        excluir
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}
