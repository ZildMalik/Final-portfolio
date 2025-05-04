import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import BlogCard from '../features/BlogCard';
import Button from '../ui/Button';
import blogPosts from '../../data/blogPosts';
import '../../styles/sections/blog-preview.css';

const BlogPreview = () => {
  const blogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (blogRef.current) {
      observer.observe(blogRef.current);
    }

    return () => {
      if (blogRef.current) {
        observer.unobserve(blogRef.current);
      }
    };
  }, []);

  // Show only the 3 most recent blog posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="blog-preview">
      <div className="container">
        <SectionHeading 
          title="Latest Blog Posts" 
          subtitle="Insights and tutorials from my journey"
          centered
        />
        
        <div className="blog-preview-grid" ref={blogRef}>
          {recentPosts.map((post, index) => (
            <BlogCard 
              key={post.id}
              post={post}
              index={index}
            />
          ))}
        </div>
        
        <div className="blog-preview-more">
          <Link to="/blog">
            <Button variant="secondary">View All Posts</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;