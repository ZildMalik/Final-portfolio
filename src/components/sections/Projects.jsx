import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../features/ProjectCard';
import Button from '../ui/Button';
import projects from '../../data/projects';
import '../../styles/sections/projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(4);
  const projectsRef = useRef(null);
  
  const categories = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  
  const handleFilterChange = (category) => {
    setFilter(category);
    setVisibleProjects(4);
    
    // Scroll to the top of the projects section with a slight delay
    setTimeout(() => {
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  const loadMoreProjects = () => {
    setVisibleProjects(prevVisible => prevVisible + 4);
  };

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <SectionHeading 
          title="My Projects" 
          subtitle="Check out my latest work"
          centered
        />
        
        <div className="projects-filter">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        {visibleProjects < filteredProjects.length && (
          <div className="projects-load-more">
            <Button 
              variant="secondary" 
              onClick={loadMoreProjects}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;