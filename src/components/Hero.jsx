import './Hero.css'
import movieBackground from '../assets/movie-background.jpeg'

function Hero(){
    console.log(movieBackground);
    return(
        <section
  className="hero-section"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.85)
      ),
      url(${movieBackground})
    `
  }}
>
            <div className='hero-content'>
                <h1>Unlimted movies, shows, and more</h1>
                <h3>Starts at ₹149. Cancel at any time.</h3>

                <p>
                    Ready to watch? Enter your email to create or restart your membership
                </p>

                <div className='email-form'>
                    <input type="email" placeholder='Email address' />

                    <button>Get Started</button>
                </div>
                <div className="hero-curve"></div>

            </div>

        </section>
    )
}


export default Hero