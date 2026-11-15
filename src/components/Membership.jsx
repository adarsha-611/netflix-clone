import './Membership.css'

function Membership() {
  return (
    <section className="membership-section">
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <div className="membership-form">
        <input type="email" placeholder="Email address" />
        <button>Get Started ❯</button>
      </div>
    </section>
  )
}

export default Membership