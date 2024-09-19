import { db } from "../firebase/config";

//autenticação do usuário 


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    // cancela a ativação da função apos o usuário ser autenticado.
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(); //retorna a autenticação do firebase.

    //termina a ativação das funções caso tudo tenha sido realizado.
    function checkIfIsCancelled() {
        if(cancelled) {  //se tiver true, cancela o processamento.
            return;
        }
    }

    //register
    const createUser = async (data) => { //função async (assincrona) = permite que o código continue sendo executado enquanto ela opera. Como ela vai se conectar com o firebase, o ideial é que o codigo não aguarde o retorno para prosseguir. 
        
        checkIfIsCancelled(); //checa se já foi criado.

        setLoading(true); //carregando...

        try {
            //criação do usuário
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password)

            //atualização do nome do usuário (lógica do próprio firebase)
            await updateProfile(user, {displayName: data.displayName, photoURL: data.photoURL})

            return user;

        }
        catch (error){ //caso a criação do usuário não consiga ser concluída, dispara um erro.
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "Esse e-mail já está cadastrado."
            }
            else {
                systemErrorMessage = "Ocorreu um erro. Tente mais tarde!";
            }

            setError(systemErrorMessage);
        }
        setLoading(false); //fim do carregamento...
    };

    //logout 
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth);
    }

    //login
    const login = async(data) => {

        checkIfIsCancelled();  

        setLoading(true); //carregando...
        setError(false);

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password); //função do firebase q efetua o login com base nos parametros enviados;
        }
        catch (error){
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

            let systemErrorMessage;

            if(error.message.includes("auth/invalid-credential")) {
                systemErrorMessage = "E-mail ou senha incorreto."
            }
            else if(error.message.includes("auth/too-many-requests")){
                systemErrorMessage = "Muitas tentativas inválidas. Por favor, tente mais tarde!"
            }
            else {
                 systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde!"
            }

            console.log(systemErrorMessage);
            setError(systemErrorMessage);
        }

        console.log(error);

        setLoading(false); //fim do carregamento...
    }

    //lógica: muda o status de canceled para true quando tudo é carregado e válida a checkIfIsCancelled, assim as outras funções não são executadas novamente.
    useEffect( () => {
        return () => setCancelled(true)
    }, []);


    return {auth, createUser, error, loading, logout, login};
}