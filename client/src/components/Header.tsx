import { Link } from '@tanstack/react-router'
import { LogIn, LogOut } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export default function Header() {
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
            >
              Todos
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <LogIn className="size-4" />
        </div>
      </nav>
    </header>
  )
}
