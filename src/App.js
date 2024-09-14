
import './App.css';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


//components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

//pages
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import CreatePost from "./pages/CreatePost/CreatePost"
import Profile from "./pages/Profile/Profile"

//context
import { AuthProvider } from './context/AuthContext';

//firebase
import { onAuthStateChanged } from 'firebase/auth'; //mapea se a autenticação do usuário foi feita com sucesso.

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const LoadingUser = user === undefined;

  //verifica a autenticação.
  useEffect( () => {
    onAuthStateChanged(auth, (user) => { setUser(user)}) //função própria do firebase
    //cada vez que o usuário muda, seja autenticado ou não, ele retorna um 'user' ou um 'null'
    //quando é 'user', ele é passado no contexto 'AuthProvider' para todo os componentes do app.js
    // Assim, atraves do contexto, todos elementos terão acesso ao User.
    
  }, [auth]);


  if(LoadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <Navbar/>
          <div className="container">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={!user ? <Login/>: <Navigate to="/"/>} /> {/*condicionais para impedir o acesso do usuário em casos de logado (user) ou não (!user)*/}
                <Route path="/register" element={!user ? <Register/>: <Navigate to="/"/>} />
                <Route path="/posts/create" element={user ? <CreatePost/> : <Navigate to="/"/>} />
                <Route path="/profile" element={user ? <Profile/> : <Navigate to="/"/>} />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
