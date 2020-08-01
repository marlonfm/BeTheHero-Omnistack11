import React, {useState} from 'react';
import heroes from '../../assets/heroes.png';
import Logo from '../../assets/logo.svg';
import './style.css';   
import { Link,useHistory } from 'react-router-dom'; 
import api from '../../services/api';

export default function Logon () {

    const [id, setId] = useState('');
    const history = useHistory()

    async function handlerlogin(e) {

        e.preventDefault();


        try{
            const response = await api.post('sessions', { id });
            alert(`Seja bem vindo ${response.data.name}`)

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch {
            alert('ID nao existe')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="logo" />

                <form onSubmit={handlerlogin}>
                    <h1>Faça Seu Logon</h1>

                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button"type="submit">Entrar</button> 

                    <Link className="back-link"to="/registro">
                        
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>

            <img src={heroes} alt="Heroi" />
        </div>
    );
}