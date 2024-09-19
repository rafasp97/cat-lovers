
import './App.css';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';


//components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

//pages
import Home from './pages/Home/Home';
import About from "./pages/About/About"
import CreatePost from "./pages/CreatePost/CreatePost"
import Profile from "./pages/Profile/Profile"
import EditProfile from './pages/EditProfile/EditProfile';
import Search from './pages/Search/Search';
import LoginOrRegister from './pages/LoginOrRegister/LoginOrRegister';
import NotFound from './pages/NotFound/NotFound';


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
                <Route path="/" element={!user ? <LoginOrRegister/> : <Navigate to="/home"/>} /> {/*condicionais para impedir o acesso do usuário em casos de logado (user) ou não (!user)*/}
                <Route path="/home" element={user ? <Home/> : <Navigate to="/"/>} />
                <Route path="/search" element={<Search/>} /> {/*componente de pesquisa */}
                <Route path="/about" element={<About/>} /> {/*pagina estática, todos tem acesso.*/}
                <Route path="/posts/create" element={user ? <CreatePost/> : <Navigate to="/home"/>} />
                <Route path="/profile" element={user ? <Profile/> : <Navigate to="/home"/>} />
                <Route path="/edit-profile" element={user ? <EditProfile/> : <Navigate to="/home"/>} />
                <Route path="*" element={<NotFound />} /> {/* Rota de erro para URLs não reconhecidas */}
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
