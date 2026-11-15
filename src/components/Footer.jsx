import './Footer.css'

function Footer() {
  return (
    <footer className="footer-section">
      <p className="footer-contact">
        Questions? Call <a href="#">000-800-919-1743</a>
      </p>

      <div className="footer-links">
        <a href="#">FAQ</a>
        <a href="#">Help Centre</a>
        <a href="#">Account</a>
        <a href="#">Media Centre</a>
        <a href="#">Investor Relations</a>
        <a href="#">Jobs</a>
        <a href="#">Ways to Watch</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie Preferences</a>
        <a href="#">Corporate Information</a>
        <a href="#">Contact Us</a>
      </div>

      <button className="footer-language">English ▼</button>

      <p className="footer-country">Netflix India</p>
    </footer>
  )
}

export default Footer