
import { useState, useEffect } from 'react'
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
    //elementos necessários para armazenar as infos do formulário
    const [email, setEmail] = useState(""); //email do usuário
    const [password, setPassword] = useState(""); //senha do usuário

    const [error, setError] = useState("");

    //elementos retornados de useAuthentication.js
    //'error: authError' => renomeia o error porque já tem outro error no arquivo. error => erro de front-end, authError => erro de autenticação.
    const {login, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

         //ao clicar no submit, aciona a função e salva os itens salvos nos inputs/states em um objeto.
        const user = {
            email,
            password
        }

        //envia o usuário para o useAuthentication, onde tem a função createUser.
        const res = await login(user);

        console.log(res);
    }

    //mapeamento do setError
    useEffect( () => {
      if(authError) {
        setError(authError); //autiliza o erro de autenticação como um erro de front, assim ele tem a mesma configuração na página html.
        
      }
    }, [authError]);

    //limpa o error apos 2 segundos
    if(error !== ""){
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    
  return (
    <div>
        <h1>Bem vindo ao CatLovers !</h1>
        <p>Por favor, faça login para continuar.</p>  
        <form onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input 
                type="email"
                name="email"
                required
                placeholder='E-mail do usuário'
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                type="password"
                name="password"
                required
                placeholder='Insira sua senha'
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            {!loading && <button className="btn">Entrar</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login