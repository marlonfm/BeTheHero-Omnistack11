import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030', // pegando o banco para fazer integracao com o front
})

export default api;

//importar este arquivo nas pages que eu quero que tenha a conexao com o BD.