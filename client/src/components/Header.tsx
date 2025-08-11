import { Link, useRouter } from '@tanstack/react-router'
import { LogIn, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { authClient } from '../lib/auth-client'

export default function Header() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [error, setError] = useState('')

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [error])

  const handleLogin = () => {
    router.navigate({ to: '/signin' })
  }

  const handleLogout = async () => {
    setError('')
    try {
      await authClient.signOut()
    } catch (e) {
      console.error('Logout failed', e)
      setError('Failed to logout')
    }
  }

  return (
    <header className="bg-base-300">
      <nav className="navbar">
        <div className="navbar-start">
          <div className="px-2">
            <Link to="/" activeProps={{ className: 'font-bold text-primary' }}>
              Home
            </Link>
          </div>

          <div className="px-2">
            <Link
              to="/todos"
              activeProps={{ className: 'font-bold text-primary' }}
              disabled={!session}
            >
              Todos
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          {isPending ? null : session ? (
            <button
              aria-label="Logout"
              className="btn btn-ghost btn-sm"
              onClick={handleLogout}
            >
              <LogOut className="size-4 hover:text-warning" />
            </button>
          ) : (
            <button
              aria-label="Login"
              className="btn btn-ghost btn-sm"
              onClick={handleLogin}
            >
              <LogIn className="size-4 hover:text-primary" />
            </button>
          )}
        </div>
      </nav>

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </header>
  )
}
