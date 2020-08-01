import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link,useHistory } from 'react-router-dom';   
import api from '../../services/api'; // vai servir pra pegar declara-la

export default function Register() {
    const [name, setName] = useState(''); // jogar o name dentro do input como value={name}, e o set, por e => setEmail(e.target.value)
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setuf] = useState('');

    const history = useHistory(); // serve pra quando submitar o cadastro, redirecionar para pagina q eu escolher 

    async function handlerRegister(e) { // funcao q ira fazer a conexao

        e.preventDefault()    

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        

        try {
            const res = await api.post('ongs', data); //ta pegando a tabela ongs, e adicionando os dados do DATA q foram digitados

            alert(`seu ID de acesso: ${res.data.id}`); 

            history.push('/') // chama  o const history = useHistory() e da um push / q retorna a page inicial
        }
        catch(err) {
            alert('erro no cadastro');
        }




    }


    return (
        <div className="register-container">   
        <div className="content">
            <section>
                <img src={Logo} alt="LOGO"/>
            

            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

            <Link className="back-link"to="/">
                        
                Voltar para o Logon
            </Link>
            </section>
            <form onSubmit={handlerRegister}>
                <input placeholder="Nome da ONG" 
                value={name} //pega valor do useState do name
                onChange={e => setName(e.target.value)}/>

                <input type="email" 
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                
                />


                <input placeholder="Whatsapp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                
                
                />

                <div className="input-group">
                 <input placeholder="Cidade" 
                 value={city}
                 onChange={e => setCity(e.target.value)}
                 
                 />


                <input placeholder="UF" style={{ width: 80, }}
                value={uf}
                onChange={e => setuf(e.target.value)}
                
                />
                </div>

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
        </div>
    );
}

