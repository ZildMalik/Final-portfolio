import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import '../../styles/components/blog-card.css';

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add delay based on index for staggered animation
            entry.target.style.transitionDelay = `${index * 0.2}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <article className="blog-card" ref={cardRef}>
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <img src={post.coverImage} alt={post.title} />
          <div className="blog-card-date">
            <span className="day">{formatDate(post.date).day}</span>
            <span className="month">{formatDate(post.date).month}</span>
          </div>
        </div>
        <div className="blog-card-content">
          <div className="blog-card-category">
            {post.category}
          </div>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          
          {/* Show image count if there are additional images */}
          {post.images && post.images.length > 0 && (
            <div className="blog-card-images-count">
              <i className="fas fa-images"></i>
              <span>{post.images.length} images</span>
            </div>
          )}
          <div className="blog-card-footer">
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;