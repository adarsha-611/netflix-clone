
import './FeaturedMovie.css'
import browseBackground from '../assets/browse-background.png'

function FeaturedMovie() {
  return (
    <section
  className="featured-movie"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.9), transparent 85%),
      linear-gradient(to top, #141414, transparent 45%),
      url(${browseBackground})
    `
  }}
>
      <div className="featured-content">
        <p className="featured-label">NETFLIX ORIGINAL</p>

        <h1>STRANGER THINGS</h1>

        <p className="featured-description">
          When a young boy disappears, a small town uncovers
          a mystery involving secret experiments and
          supernatural forces.
        </p>

        <div className="featured-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="info-btn">ⓘ More Info</button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMovie
