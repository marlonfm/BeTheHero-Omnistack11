import React, {useState} from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link,useHistory } from 'react-router-dom'; 
import api from '../../services/api';

export default function NewIncident() {

    const [titulo, settitulo] = useState(''); // ao declara nomes de funcoes, usar sempre o nome igual da coluna do BD.
    const [descricao, setdescricao] = useState('');
    const [valor, setvalor] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId')

    async function handleCadastro(e) {
        e.preventDefault()

        const data = {
            titulo,
            descricao,
            valor,
        }

        try{
            await api.post('/incident', data, {
                headers: {
                    Authorization: ongId,
                }

               
            });
            history.push('/profile');
        } catch(err){
            alert('erro');
        }

    }

    return (
        <div className="new-incident">   
        <div className="content">
            <section>
                <img src={Logo} alt="LOGO"/>
            

            <h1>Cadastrar Novo Caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um brabo para resolver isso</p>

            <Link className="back-link"to="/profile">
                        
                Voltar para Home
            </Link>
            </section>
            <form onSubmit={handleCadastro}>
                <input placeholder="Titulo do Caso"
                value={titulo}
                onChange={e => settitulo(e.target.value)}
                />
                <textarea placeholder="Descrição" 
                value={descricao}
                onChange={e=> setdescricao(e.target.value)}
                />
                <input placeholder="Valor em reais" 
                value={valor}
                onChange={e => setvalor(e.target.value)}
                />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
        </div>
    );
}