import './Navigation.css'
import { Link } from 'react-router-dom'
import {
  GoogleIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
  UserIcon
} from '../icons/Icons.tsx'
import { useEffect, useRef, useState } from 'react'
import { UseGameContext } from '../../context/GameContext.tsx'
import { UseUserContext } from '../../context/UserContext.tsx'

export const Navigation = () => {
  const { user, login, logout } = UseUserContext()
  const { _id } = UseGameContext()
  const [menu, setMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMenu = () => {
    setMenu(!menu)
  }
  const closeMenu = () => {
    setMenu(false)
  }

  return (
    !_id && (
      <nav ref={menuRef}>
        {user ? (
          <>
            <img
              src={user?.picture}
              alt={`Profile picture of ${user?.name}`}
              title="Profile picture of the user"
              className="user-icon"
              onError={(e) => {
                e.currentTarget.src = '/user.webp'
                e.currentTarget.alt = 'Image not found'
              }}
            />
            <samp>{user?.name}</samp>
          </>
        ) : (
          <>
            <img
              src="/user.webp"
              alt={`Profile picture of Guest`}
              title="Profile picture of the user"
              className="user-icon"
              onError={(e) => {
                e.currentTarget.src = '/user.webp'
                e.currentTarget.alt = 'Image not found'
              }}
            />
            <samp>Guest</samp>
          </>
        )}
        <button type="button" title="menu" onClick={handleMenu}>
          <MenuIcon />
        </button>
        <ul className={menu ? 'menu-active' : ''}>
          <li>
            <Link onClick={closeMenu} to="/">
              <span>Home</span> <HomeIcon />
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/single-player">
              <span>Single Player</span> <UserIcon />
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/multiplayer">
              <span>Multiplayer</span> <UserGroupIcon />
            </Link>
          </li>
          <li>
            <div
              onClick={() => {
                closeMenu()
                if (user && user.idGoogle === 'guest') {
                  login()
                } else {
                  logout()
                }
              }}
              className="divLink"
            >
              <span>
                {user && user.idGoogle === 'guest' ? 'Login' : 'Logout'}
              </span>
              <GoogleIcon />
            </div>
          </li>
        </ul>
      </nav>
    )
  )
}
