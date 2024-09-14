//context permite uma funcionalidade de compartilhar dados e estados entre componentes sem a necessidade validação.


import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children, value}){ //children são todos elementos envolvidos por ele, e 'value' é o user.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 
//O AuthContext.Provider é o componente que você usa para fornecer o valor do contexto (value) para todos os componentes abaixo dele na árvore.
//Qualquer componente dentro da árvore que usa useContext(AuthContext) pode acessar esse valor.

export function useAuthValue() { //utiliza o valor de authprovide no app.js
    return useContext(AuthContext);
}