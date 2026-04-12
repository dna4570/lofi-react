import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else alert('確認メールを送りました！')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '2rem' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit} style={{ width: '100%', padding: '0.5rem' }}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <p
        onClick={() => setIsSignUp(!isSignUp)}
        style={{ cursor: 'pointer', marginTop: '1rem', textAlign: 'center' }}
      >
        {isSignUp ? 'すでにアカウントあり → Login' : 'アカウント作成 → Sign Up'}
      </p>
    </div>
  )
}
