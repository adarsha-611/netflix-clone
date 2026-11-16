
import './Navbar.css';
import { useNavigate } from 'react-router-dom'


function Navbar(){
    const navigate = useNavigate()
    return(
        <nav className="navbar">
            <h2 className="logo">NETFLIX</h2>
             
             <div className="navbar-right">
                <button className="language-btn">
  English
  <span className="dropdown-icon"></span>
</button>
                <button
  className="signin-btn"
  onClick={() => navigate('/login')}
>
  Sign In
</button>

             </div>
        </nav>
    )
}

export default Navbar;