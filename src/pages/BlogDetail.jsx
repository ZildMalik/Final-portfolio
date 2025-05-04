import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import blogPosts from '../data/blogPosts';
import Button from '../components/ui/Button';
import '../styles/pages/blog-detail.css';
import BlogImageGallery from '../components/features/BlogImageGallery';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // Find the post with matching slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts (same category, excluding current post)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 2);
      
      setRelatedPosts(related);
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    } else {
      // If post not found, redirect to blog page
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <div className="blog-detail-header">
        <div className="container">
          <span className="blog-category">{post.category}</span>
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">{formatDate(post.date).formatted}</span>
            <span className="blog-author">By {post.author}</span>
          </div>
        </div>
      </div>
      
      {/* Cover Image */}
      {post.coverImage && (
        <div className="blog-cover-image">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="cover-image"
          />
        </div>
      )}
      
      <div className="container blog-container">
        <div className="blog-content">
          {/* Convert markdown-like content to HTML */}
          <div
            className="blog-body"
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHTML(post.content)
            }}
          />
          
          {/* Add image gallery if there are additional images */}
          {post.images && post.images.length > 0 && (
            <BlogImageGallery images={post.images} />
          )}
          
          <div className="blog-share">
            <h4>Share This Post</h4>
            <div className="social-share-links">
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="blog-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {Array.from(new Set(blogPosts.map(p => p.category))).map((category, index) => (
                <li key={index}>
                  <Link to={`/blog?category=${category.toLowerCase()}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="sidebar-section">
              <h3>Related Posts</h3>
              <div className="related-posts">
                {relatedPosts.map(related => (
                  <Link to={`/blog/${related.slug}`} key={related.id} className="related-post">
                    <img src={related.coverImage} alt={related.title} />
                    <h4>{related.title}</h4>
                    <span>{formatDate(related.date).formatted}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="sidebar-section">
            <h3>Return to Blog</h3>
            <Link to="/blog">
              <Button variant="secondary">View All Posts</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple function to convert markdown-like syntax to HTML
// (In a real app, you would use a proper markdown parser)
const convertMarkdownToHTML = (markdown) => {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Convert headings
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$2</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Convert paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gm, function(match) {
    const trimmed = match.trim();
    if (/^<(\/)?(h[1-6]|ul|ol|li|blockquote|code|img|p)/.test(trimmed)) return trimmed;
    return `<p>${trimmed}</p>`;
  });
  
  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert image syntax
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="blog-img" />');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Convert code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  return html;
};

export default BlogDetail;