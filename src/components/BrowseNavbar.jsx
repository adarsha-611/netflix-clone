
import { useState } from 'react'
import './BrowseNavbar.css'

function BrowseNavbar({ activeSection, onSectionChange, onLogout }) {
  const [showProfile, setShowProfile] = useState(false)

  const navItems = [
    'Home',
    'TV Shows',
    'Movies',
    'New & Popular',
    'My List'
  ]

  return (
    <nav className="browse-navbar">
      <div className="browse-nav-left">
        <h1 className="browse-logo">NETFLIX</h1>

        <div className="browse-nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              className={activeSection === item ? 'active' : ''}
              onClick={() => {
                if (item === 'Home' || item === 'My List') {
                  onSectionChange(item)
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="browse-nav-right">
        <button className="nav-icon">🔍</button>
        <button className="nav-icon">🔔</button>

        <div className="profile-container">
          <button
            className="profile-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            👤 <span>▼</span>
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <button onClick={() => setShowProfile(false)}>
                Manage Profiles
              </button>
              <button onClick={() => setShowProfile(false)}>
                Account
              </button>
              <button onClick={() => setShowProfile(false)}>
                Help Center
              </button>
              <button
                className="logout-btn"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default BrowseNavbar
