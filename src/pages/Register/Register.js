
import { useState, useEffect } from 'react'
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    //elementos necessários para armazenar as infos do formulário
    const [displayName, setDisplayName] = useState(""); //nome de usuário
    const [email, setEmail] = useState(""); //email do usuário
    const [password, setPassword] = useState(""); //senha do usuário
    const [confirmPassword, setConfirmPassword] = useState(""); //confirmação de senha

    const [error, setError] = useState("");

    //elementos retornados de useAuthentication.js
    //'error: authError' => renomeia o error porque já tem outro error no arquivo. error => erro de front-end, authError => erro de autenticação.
    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

         //ao clicar no submit, aciona a função e salva os itens salvos nos inputs/states em um objeto.
        const user = {
            displayName, //dica: o firebase é sensitive, os parametros enviados precisam ser exatamente com esse nome.
            email,
            password
        }

        //VALIDAÇÃO DE FORMULÁRIO:
        
        //senha:
        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!");
            return;
        }

        //email: aceita apenas domínios com Yahoo, Outlook, iCloud e Gmail.
        const validateEmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|icloud\.com|hotmail\.com|hotmail\.com\.br)$/;
        if(!validateEmail.test(email)){
        setError("Esse email não é válido!");
        return;
        }

        //envia o usuário para o useAuthentication, onde tem a função createUser.
        const res = await createUser(user);

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
        <h1>Cadastre-se</h1>   
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input 
                type="text"
                name="displayName"
                required
                placeholder='Nome do usuário'
                value = {displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
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
            <label>
                <span>Confirmação de senha:</span>
                <input 
                type="password"
                name="confirmPassword"
                required
                placeholder='Confirme a sua senha'
                value = {confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            {!loading && <button className="btn">Cadastrar</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register