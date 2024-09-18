

//envio de posts para o firebase;


import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config'
import {collection, addDoc, Timestamp} from 'firebase/firestore'


//define o estado inicial do useReducer dentro da função useInsertDocument
const initialState = {
    loading: null,
    error: null
};

//estado e ações do hook:
const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading:true, error:null}
        case "INSERTED_DOC":
            return {loading:false, error: null}
        case "ERROR":
            return {loading:false, error: action.payload}
        default:
            return state;
    }
};

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    //limpar memoria
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action);
        }
    };

    //funcionalidade de enviar o documento para o firebase
    const insertDocument = async(document) => {

        //define o loading enquanto o documento é enviado na função assincrona insertDocument
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            //criação do novo documento. recebe o document enviado pelo paramêtro da função, e o createAt retorna a data em que foi criado.
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc( //addDoc = função que adiciona um novo elemento a uma coleção.
                //collection é uma função de acesso da firestore que recebe o banco de dados (exportado de firebase/config.js) e 'docCollection' é um nome aleatório utilizado para definir essa coleção de documentos. 
                collection(db, docCollection),
                //newDocument vem da constante que contem o document do 'createPost.js' + um parametro que marca a data.
                newDocument
            )

            //define o fim do carregamento e limpa o state de erro.
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            });

        } catch (error) {
            
            //dispara um erro com uma mensagem
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    }

    //após o post ser criado, ou seja, ter sua função executada: impede a continuidade das ações para evitar atualizações dos states..
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {insertDocument, response};

};