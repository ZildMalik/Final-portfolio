import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <NavLink to="/" onClick={closeMobileMenu}>
            <span className="highlight">Zild</span>Abule
          </NavLink>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <NavLink to="/#hero" onClick={closeMobileMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/#about" onClick={closeMobileMenu}>About</NavLink>
            </li>
            <li>
              <NavLink to="/#experiences" onClick={closeMobileMenu}>Experience</NavLink>
            </li>
            <li>
              <NavLink to="/#projects" onClick={closeMobileMenu}>Projects</NavLink>
            </li>
            <li>
              <NavLink to="/#blog" onClick={closeMobileMenu}>Blog</NavLink>
            </li>
            <li>
              <NavLink to="/#contact" onClick={closeMobileMenu}>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;