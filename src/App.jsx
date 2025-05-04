import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';

// Import all global styles
import './styles/variables.css';
import './styles/globals.css';
import './styles/animations.css';

const App = () => {
  const location = useLocation();
  
  // Scroll to top on route change (except for hash links)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;