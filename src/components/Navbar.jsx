
import './Navbar.css';


function Navbar(){
    return(
        <nav className="navbar">
            <h2 className="logo">NETFLIX</h2>
             
             <div className="navbar-right">
                <button className="language-btn">
  English
  <span className="dropdown-icon"></span>
</button>
                <button className="signin-btn">Sign In</button>

             </div>
        </nav>
    )
}

export default Navbar;