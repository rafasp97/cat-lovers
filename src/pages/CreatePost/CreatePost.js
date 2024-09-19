import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument("posts");

  const navigate = useNavigate();
  

  //função para verificar se a URL leva a uma imagem válida
  const isImageUrlValid = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true); // Se a imagem carregar com sucesso
        img.onerror = () => resolve(false); // Se houver um erro ao carregar a imagem
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    //validar a url da imagem
    const isValid = await isImageUrlValid(image);

    if(!isValid){
      setFormError('URL inválida.');

      //limpa a mensagem ápos 2 segundos.
      setTimeout(() => {
        setFormError(null);
      }, 2000);

      return;
    }

    //criar o array de tags
    const tagsArray = tags.split(" ").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }


    //criação do post a partir dos valores de input
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
      userphotoURL: user.photoURL
    })

    //limpa a mensagem ápos 2 segundos.
    setTimeout(() => {
      setFormError(null);
    }, 2000);

    //redirecionar para home
    navigate("/");
    
    
  };
  return (
    <div>
      <h2>Escreva sobre gatinhos!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
          type="text"
          name="title"
          required
          placeholder="Escolha um título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input
          type="text"
          name="image"
          required
          placeholder="exemplo: https://...jpg"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea 
          name="body"
          required
          placeholder="O que aconteceu?"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input
          type="text"
          name="tags"
          required
          placeholder="Exemplo: cool catlovers"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Enviar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost