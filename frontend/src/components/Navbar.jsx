import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // or "/login"
  };

  return (
    <nav style={{display : 'flex' , justifyContent : 'space-evenly' , marginTop : '10px' , textDecoration : 'none'}}>
      <NavLink style={{textDecoration : 'none'}} to='/' className={({isActive}) => isActive ? "active-link" : ""} >Home</NavLink>

      { token ? (
        <>
          <NavLink to='/trips' className={({isActive}) => isActive ? "active-link" : ""}>trips</NavLink>
          <button onClick={handleLogout} style={{background:'transparent',border:'none',cursor:'pointer'}}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to='/login' className={({isActive}) => isActive ? "active-link" : ""}>Login</NavLink>
          <NavLink to='/register' className={({isActive}) => isActive ? "active-link" : ""}>Register</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;