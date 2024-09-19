import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
        <h2>Página não encontrada</h2>
        <Link to="/home">Por favor, volte ao início</Link>
    </div>
  )
}

export default NotFound