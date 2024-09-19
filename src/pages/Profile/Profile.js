import React from 'react'

import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();

  const handleEditPerfil = () => {
    navigate('/edit-profile');
  }

  return (
    <div>
        <h1>Perfil</h1>
        <button onClick={handleEditPerfil}>Editar Perfil</button>
    </div>
  )
}

export default Profile