import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { CircleX, KeyRound, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (session) {
    router.navigate({ to: '/todos' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)

    try {
      await authClient.signUp.email({
        name,
        email,
        password,
      })

      router.navigate({
        to: '/todos',
      })
    } catch (err) {
      setError('An unexpected error occured')
      console.error('Signup failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-base-100 pt-12">
      <div className="card bg-base-300 max-w-md">
        <div className="card-body p-8">
          <div className="card-title text-3xl px-4">Create an Account</div>
          <p className="text-base-content/70 my-2 text-center">
            Sign up to get started
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
                <User />
                <input
                  id="full-name"
                  type="text"
                  required
                  placeholder="Full Name"
                  pattern="[A-Za-z][A-Za-z\-]*"
                  minLength={3}
                  maxLength={30}
                  title="Only letters or dash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </label>
              <p className="validator-hint hidden">
                3 to 30 characters only letters or dashes
              </p>
            </div>

            <div className="mt-3">
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

            <div className="mt-3">
              <label className="input validator">
                <KeyRound />
                <input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  minLength={8}
                  title="Must be more than 8 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <span className="ml-2 text-primary">
                      Creating account...
                    </span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base-content/70">
                Already have an account?{' '}
                <Link to="/signin" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
