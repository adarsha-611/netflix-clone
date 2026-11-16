
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase/firebase'
import BrowseNavbar from '../components/BrowseNavbar'
import FeaturedMovie from '../components/FeaturedMovie'

import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
  fetchTrailer
} from '../services/tmdb'

import './Browse.css'

function Browse() {
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('Home')

  const [movies, setMovies] = useState([])
  const [tvShows, setTVShows] = useState([])

  const [myList, setMyList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('myNetflixList')) || []
    } catch {
      return []
    }
  })

  const [hoveredId, setHoveredId] = useState(null)
  const [trailerKeys, setTrailerKeys] = useState({})
  const [selectedTrailer, setSelectedTrailer] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch trending movies and TV shows
  useEffect(() => {
    async function getContent() {
      try {
        const [movieData, tvData] = await Promise.all([
          fetchTrendingMovies(),
          fetchTrendingTVShows()
        ])

        setMovies(movieData)
        setTVShows(tvData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getContent()
  }, [])

  // Save My List whenever it changes
  useEffect(() => {
    localStorage.setItem('myNetflixList', JSON.stringify(myList))
  }, [myList])

  // Logout
  async function handleLogout() {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err.message)
    }
  }

  // Check whether a title is saved
  function isSaved(item) {
    return myList.some(
      (saved) => saved.id === item.id &&
        saved.mediaType === item.mediaType
    )
  }

  // Add or remove a title
  function toggleMyList(item, mediaType) {
    const savedItem = { ...item, mediaType }

    setMyList((currentList) => {
      const exists = currentList.some(
        (saved) =>
          saved.id === item.id &&
          saved.mediaType === mediaType
      )

      if (exists) {
        return currentList.filter(
          (saved) =>
            !(saved.id === item.id &&
              saved.mediaType === mediaType)
        )
      }

      return [...currentList, savedItem]
    })
  }

  // Get trailer when hovering over a title
  async function handleHover(item, mediaType) {
    const key = `${mediaType}-${item.id}`

    setHoveredId(key)

    if (trailerKeys[key] !== undefined) return

    try {
      const trailer = await fetchTrailer(item.id, mediaType)

      setTrailerKeys((current) => ({
        ...current,
        [key]: trailer
      }))
    } catch (err) {
      console.error('Trailer error:', err.message)

      setTrailerKeys((current) => ({
        ...current,
        [key]: null
      }))
    }
  }

  // Open trailer in large player
  async function playTrailer(item, mediaType) {
    const key = `${mediaType}-${item.id}`

    let trailer = trailerKeys[key]

    if (trailer === undefined) {
      try {
        trailer = await fetchTrailer(item.id, mediaType)

        setTrailerKeys((current) => ({
          ...current,
          [key]: trailer
        }))
      } catch (err) {
        console.error('Trailer error:', err.message)
      }
    }

    if (trailer) {
      setSelectedTrailer({
        key: trailer,
        title: item.title || item.name
      })
    } else {
      alert('Trailer is not available for this title.')
    }
  }

  // Display movie or TV show cards
  function renderMovieRow(title, items, mediaType) {
    return (
      <section className="movie-section" key={title}>
        <h2>{title}</h2>

        <div className="movie-row">
          {items.map((item) => {
            const itemMediaType =
              mediaType === 'saved' ? item.mediaType : mediaType

            const cardKey = `${itemMediaType}-${item.id}`

            const isHovered = hoveredId === cardKey
            const trailerKey = trailerKeys[cardKey]
            const saved = isSaved({
              ...item,
              mediaType: itemMediaType
            })

            return (
              <div
                className="movie-card"
                key={cardKey}
                onMouseEnter={() =>
                  handleHover(item, itemMediaType)
                }
                onMouseLeave={() => setHoveredId(null)}
              >
                {isHovered && trailerKey ? (
                  <iframe
                    className="movie-preview"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                    title={`${item.title || item.name} preview`}
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://placehold.co/300x450?text=No+Poster'
                    }
                    alt={item.title || item.name}
                  />
                )}

                <div className="movie-card-info">
                  <h3>{item.title || item.name}</h3>

                  <div className="movie-card-actions">
                    <button
                      onClick={() =>
                        playTrailer(item, itemMediaType)
                      }
                    >
                      ▶ Play
                    </button>

                    <button
                      onClick={() =>
                        toggleMyList(item, itemMediaType)
                      }
                    >
                      {saved ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div className="browse-page">
      <BrowseNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      <main>
        {activeSection === 'Home' && <FeaturedMovie />}

        {loading && (
          <p className="browse-message">Loading titles...</p>
        )}

        {error && (
          <p className="movie-error">{error}</p>
        )}

        {!loading && !error && activeSection === 'Home' && (
          <>
            {renderMovieRow('Trending Movies', movies, 'movie')}

            {renderMovieRow('Trending TV Shows', tvShows, 'tv')}
          </>
        )}

        {!loading && activeSection === 'My List' && (
          <section className="my-list-section">
            <h2>My List</h2>

            {myList.length === 0 ? (
              <p>
                Your list is empty. Add movies and shows using the + button.
              </p>
            ) : (
              renderMovieRow(
                'Saved Movies & Shows',
                myList,
                'saved'
              )
            )}
          </section>
        )}
      </main>

      {/* Trailer player */}
      {selectedTrailer && (
        <div
          className="trailer-modal"
          onClick={() => setSelectedTrailer(null)}
        >
          <div
            className="trailer-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-trailer"
              onClick={() => setSelectedTrailer(null)}
            >
              ✕
            </button>

            <h2>{selectedTrailer.title}</h2>

            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
              title={`${selectedTrailer.title} trailer`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Browse
