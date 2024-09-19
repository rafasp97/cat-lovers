//cor de fundo : #f6b576


import { useState } from 'react';

//firebase
import { updateProfile } from 'firebase/auth';

//contexto
import { useAuthValue } from '../../context/AuthContext';


const EditProfile = () => {
    const {user} = useAuthValue(); 
    
    const defaultImage = '/default-image.png';

    //armazena url da imagem
    const [photoUrl, setPhotoUrl] = useState('');


    //mensagens para o usuário
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    //função para verificar se a URL leva a uma imagem válida
    const isImageUrlValid = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true); // Se a imagem carregar com sucesso
            img.onerror = () => resolve(false); // Se houver um erro ao carregar a imagem
        });
    };

    //adiciona foto ou atualiza os dados do perfil (foto e nome):
    const changeImage = async (e) => {
        e.preventDefault();

        const isValid = await isImageUrlValid(photoUrl);

        if(user && isValid){
            await updateProfile(user, {photoURL: photoUrl,});

            let successMessage = 'Imagem atualizada com sucesso!';
            setSuccess(successMessage);

            //limpa a mensagem ápos 2 segundos.
            setTimeout(() => {
                setSuccess(null);
            }, 2000);

            //limpa o input
            setPhotoUrl('');

        }
        else{
            let errorMessage = 'Url inválida... tente novamente!';
            setError(errorMessage);

            //limpa a mensagem ápos 2 segundos.
            setTimeout(() => {
                setError(null);
            }, 2000);

            //limpa o input
            setPhotoUrl('');
        }
    }


  return (

    <div>
        <div>
            <img src={user.photoURL === null ? defaultImage : user.photoURL} alt="imagemPerfil" />
        </div>
        <h1>
            {user.displayName}
        </h1>
        <form onSubmit={changeImage}>
            <label>
                <span>Altere sua foto de perfil:</span>
                <input 
                type="text" 
                placeholder="URL da imagem"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}  
                />
            </label>
            <button type='submit'>Atualizar</button>
        </form>
        {success ?? <p>{success}</p>}
        {error ?? <p>{error}</p>}
    </div>
  )
}

export default EditProfile