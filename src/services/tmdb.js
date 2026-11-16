
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function fetchData(endpoint) {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`)
  }

  return response.json()
}

export async function fetchTrendingMovies() {
  const data = await fetchData('/trending/movie/day')
  return data.results
}

export async function fetchTrendingTVShows() {
  const data = await fetchData('/trending/tv/day')
  return data.results
}

export async function fetchTrailer(id, mediaType) {
  const data = await fetchData(`/${mediaType}/${id}/videos`)

  const trailer =
    data.results.find(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Trailer' &&
        video.official
    ) ||
    data.results.find(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Trailer'
    )

  return trailer ? trailer.key : null
}
