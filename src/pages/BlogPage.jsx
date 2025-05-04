import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import BlogCard from '../components/features/BlogCard';
import blogPosts from '../data/blogPosts';
import '../styles/pages/blog-page.css';

const BlogPage = () => {
  const [filter, setFilter] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Get unique categories from blog posts
  const categories = ['all', ...new Set(blogPosts.map(post => post.category.toLowerCase()))];
  
  useEffect(() => {
    // Filter posts based on selected category
    if (filter === 'all') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        post => post.category.toLowerCase() === filter
      );
      setFilteredPosts(filtered);
    }
    
    // Scroll to top when filter changes
    window.scrollTo(0, 0);
  }, [filter]);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <h1 className="blog-page-title">My Blog</h1>
          <p className="blog-page-subtitle">
            Insights, tutorials, and updates from my journey as a developer
          </p>
        </div>
      </div>
      
      <div className="container">
        <div className="blog-filter">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id}
                post={post}
                index={index}
              />
            ))
          ) : (
            <div className="no-posts">
              <h3>No posts found in this category</h3>
              <p>Try selecting a different category or check back later for new content.</p>
              <button 
                className="filter-btn"
                onClick={() => setFilter('all')}
              >
                View All Posts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;