import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import '../styles/pages/not-found.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;