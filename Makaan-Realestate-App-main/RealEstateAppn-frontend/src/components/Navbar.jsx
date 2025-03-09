import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link ,useNavigate} from 'react-router-dom';
import { useWishlist } from '../WishlistContext';

function Navbar() {
  const {wishlist}=useWishlist();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        document.querySelector('.nav-bar').classList.add('sticky-top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    //   localStorage.removeItem('token');
        alert("You have been logged out successfully!!!")
        navigate("/loginsignup");
  };

  return (
    <div className="container-fluid nav-bar bg-transparent mt-0">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
          <h1 className="m-0 text-primary">Makaan</h1>
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Dropdown>
              <Dropdown.Toggle as={Link} to="#" className="nav-link">
                Property
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/apartment">Apartment</Dropdown.Item>
                <Dropdown.Item href="/villa">Villa</Dropdown.Item>
                <Dropdown.Item href="/house">House</Dropdown.Item>
                <Dropdown.Item href="/office">Office</Dropdown.Item>
                <Dropdown.Item href="/building">Building</Dropdown.Item>
                <Dropdown.Item href="/townhouse">Townhouse</Dropdown.Item>
                <Dropdown.Item href="/shop">Shop</Dropdown.Item>
                <Dropdown.Item href="/garage">Garage</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {localStorage.getItem('token') ? (
                <>
                  <Dropdown.Item href="/user/accountsettings">Profile</Dropdown.Item>
                  <Dropdown.Item href="/wishlist">Wishlist <span style={{marginLeft: 10, display: 'inline-block', width: 20, height: 20, borderRadius: '50%', backgroundColor: 'red', color: 'white', textAlign: 'center', lineHeight: '18px'}}>{wishlist.length}</span></Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item href="/loginsignup">Login/SignUp</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
