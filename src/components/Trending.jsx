import './Trending.css';
import movie1 from '../assets/posters/movie1.jpeg'
import movie2 from '../assets/posters/movie2.jpeg'
import movie3 from '../assets/posters/movie3.jpeg'
import movie4 from '../assets/posters/movie4.jpeg'
import movie5 from '../assets/posters/movie5.jpeg'
import movie6 from '../assets/posters/movie6.jpeg'
import movie7 from '../assets/posters/movie7.jpeg'
import movie8 from '../assets/posters/movie8.jpeg'
import movie9 from '../assets/posters/movie9.jpeg'
import movie10 from '../assets/posters/movie10.jpeg'
function Trending() {
  return (
    <section className="trending-section">
      <h2>Trending Now</h2>

   <div className="trending-list">
  <div className="movie-card">
  <span className="movie-number">1</span>
  <img src={movie1} alt="Movie 1" />
</div>
  <div className="movie-card">
  <span className="movie-number">2</span>
  <img src={movie2} alt="Movie 2" />
</div>
<div className="movie-card">
  <span className="movie-number">3</span>
  <img src={movie3} alt="Movie 3" />
</div>
<div className="movie-card">
  <span className="movie-number">4</span>
  <img src={movie4} alt="Movie 4" />
</div>

<div className="movie-card">
  <span className="movie-number">5</span>
  <img src={movie5} alt="Movie 5" />
</div>
<div className="movie-card">
  <span className="movie-number">6</span>
  <img src={movie6} alt="Movie 6" />
</div>

<div className="movie-card">
  <span className="movie-number">7</span>
  <img src={movie7} alt="Movie 7" />
</div>

<div className="movie-card">
  <span className="movie-number">8</span>
  <img src={movie8} alt="Movie 8" />
</div>

<div className="movie-card">
  <span className="movie-number">9</span>
  <img src={movie9} alt="Movie 9" />
</div>

<div className="movie-card">
  <span className="movie-number">10</span>
  <img src={movie10} alt="Movie 10" />
</div>




</div>
    </section>
  )
}

export default Trending