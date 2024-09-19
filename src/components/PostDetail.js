import styles from './PostDetail.module.css'

import { Link } from 'react-router-dom'


const PostDetail = ({post}) => {

  return (
    <div>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <div>
          <img src={post.userphotoURL} alt='foto de perfil'/>
          <p>{post.createdBy}</p>
        </div>
        <div>
            {post.tagsArray.map((tag) => (
                <p key={tag}>
                    <span>#</span>{tag}
                </p>
            ))}
        </div>
        <p>{post.body}</p> 
    </div>
  )
}

export default PostDetail