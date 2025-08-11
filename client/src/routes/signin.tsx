import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { CircleX, KeyRound, Mail } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (session) {
    router.navigate({ to: '/todos' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authClient.signIn.email({
        email,
        password,
      })

      router.navigate({ to: '/todos' })
    } catch (err) {
      setError('Invalid email or password')
      console.error('Signin failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-base-100 pt-12">
      <div className="card bg-base-300 max-w-md">
        <div className="card-body p-8">
          <div className="card-title text-3xl px-4 flex justify-center">
            Welcome back
          </div>
          <p className="text-base-content/70 my-2 text-center">
            Sign in to continue
          </p>

          {error && (
            <div role="alert" className="alert alert-error">
              <CircleX />
              <span>Error: {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label className="input validator">
                <Mail />
                <input
                  id="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

            <div className="mt-3">
              <label className="input validator">
                <KeyRound />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  title="Must be more than 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
              <p className="validator-hint hidden">Must be 8 characters long</p>
            </div>

            <div className="card-actions mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                    <span className="ml-2 text-primary">Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base-content/70">
                Don't have an account?{' '}
                <Link to="/signup" className="link link-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
