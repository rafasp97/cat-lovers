//hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useInsertDocuments';


//components
import PostDetail from '../../components/PostDetail';

const Home = () => {

  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`);

    }

  }
  return (
    <div>
        <h1>Veja nossos posts mais recentes</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)}/>
          <button>Pesquisar</button>
        </form>
        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
          ))}
          {posts && posts.length === 0 && ( //lógica para quanto o retorno do array do firebase esteja vazio.
            <div>
              <p>Não foram encontrados...</p>
              <Link to="/posts/create">Criar primeiro post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home