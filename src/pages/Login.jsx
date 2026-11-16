
import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useContext(AuthContext)

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/browse" replace />
  }

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      await signInWithEmailAndPassword(auth, email, password)

      navigate('/browse')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <header className="auth-header">
        <h1 className="auth-logo">NETFLIX</h1>
      </header>

      <main className="auth-container">
        <div className="auth-content">

          <h2>Sign In</h2>

          <p className="auth-subtitle">
            Welcome back! Enter your account details.
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <p className="auth-footer">
            New to Netflix? <Link to="/signup">Sign up now</Link>
          </p>

        </div>
      </main>

    </div>
  )
}

export default Login
