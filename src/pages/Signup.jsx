
import { useState, useContext } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import './Auth.css'

function Signup() {
  const location = useLocation()
  const navigate = useNavigate()

  const passedEmail = location.state?.email || ''

  const [email, setEmail] = useState(passedEmail)
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useContext(AuthContext)

  function handleContinue(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setStep(2)
  }

  async function handleSignup(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    try {
      setLoading(true)

      await createUserWithEmailAndPassword(auth, email, password)

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

        {user ? (
          <div className="auth-content">
            <h2>You're already signed in!</h2>
            <button onClick={() => navigate('/browse')}>
              Go to Browse
            </button>
          </div>
        ) : (
          <div className="auth-content">

            {step === 1 ? (
              <>
                <h2>Enter your email to get started</h2>

                <p className="auth-subtitle">
                  Create your account and enjoy unlimited movies and shows.
                </p>

                <form onSubmit={handleContinue}>

                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button type="submit">
                    Continue
                  </button>

                </form>
              </>
            ) : (
              <>
                <p className="step-label">STEP 2 OF 2</p>

                <h2>Create a password to start your membership</h2>

                <p className="auth-subtitle">
                  You're almost done! Create a password for your account.
                </p>

                <form onSubmit={handleSignup}>

                  <input
                    type="email"
                    value={email}
                    readOnly
                  />

                  <input
                    type="password"
                    placeholder="Add a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />

                  <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>

                </form>

                <button
                  className="back-btn"
                  onClick={() => {
                    setStep(1)
                    setError('')
                  }}
                >
                  Back
                </button>
              </>
            )}

            {error && <p className="auth-error">{error}</p>}

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>

          </div>
        )}

      </main>

    </div>
  )
}

export default Signup
