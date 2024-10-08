import { NavLink } from "react-router-dom"

import syles from './Navbar.module.css';

//context
import {useAuthValue } from '../context/AuthContext';

//firebase
import { useAuthentication } from '../hooks/useAuthentication'

const NavBar = () => {

  //busca a autenticação
  const { user } = useAuthValue();

  //busca a função logout
  const { logout } = useAuthentication();


  return (
    <nav>
      <NavLink to="/">
        Cat <span>Lovers</span>
      </NavLink>
      <ul>
        {user && (
          <>
            <li>
              <NavLink to="/home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts/create">
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                Perfil
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar