import { useState } from 'react'
import './App.css'

type Post = {
  id: number
  author: string
  content: string
  likes: number
}

function App() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: 'Alice', content: 'Hello world!', likes: 0 },
    { id: 2, author: 'Bob', content: 'My first post!', likes: 0 }
  ])
  const [newPost, setNewPost] = useState('')
  const [username, setUsername] = useState('Guest')

  const handlePost = () => {
    if (!newPost.trim()) return
    
    setPosts([...posts, {
      id: posts.length + 1,
      author: username,
      content: newPost,
      likes: 0
    }])
    setNewPost('')
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="app">
      <header>
        <h1>Social Feed</h1>
        <div className="user-section">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
        </div>
      </header>

      <div className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={handlePost}>Post</button>
      </div>

      <div className="feed">
        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <strong>{post.author}</strong>
            </div>
            <p>{post.content}</p>
            <button onClick={() => handleLike(post.id)}>
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App