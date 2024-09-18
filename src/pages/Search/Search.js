
//hooks
import { useFetchDocuments } from "../../hooks/useInsertDocuments"
import { useQuery } from "../../hooks/useQuery"

//componentes
import PostDetail from "../../components/PostDetail"

import { Link } from "react-router-dom"

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search);
  return (
    <div>
        <p>{search}</p>
        <div>
            {posts && posts.length === 0 && (
                <div>
                    <p>Não foram encontrados  posts a partir da sua busca...</p>
                    <Link to="/"> Voltar </Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
            {posts &&  <Link to="/"> Voltar </Link>}
        </div>
    </div>
  )
}

export default Search