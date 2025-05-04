import { Link } from 'react-router-dom';
import '../../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <span className="highlight">Zild</span>Abule
            </Link>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/#hero">Home</Link></li>
                <li><Link to="/#about">About</Link></li>
                <li><Link to="/#experiences">Experience</Link></li>
                <li><Link to="/#projects">Projects</Link></li>
                <li><Link to="/#blog">Blog</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Social</h4>
              <ul>
                <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
          <p>Designed and built with <span className="highlight">♥</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;