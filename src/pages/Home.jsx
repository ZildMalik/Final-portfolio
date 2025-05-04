import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experiences from '../components/sections/Experiences';
import Projects from '../components/sections/Projects';
import BlogPreview from '../components/sections/BlogPreview';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <BlogPreview />
      <Contact />
    </>
  );
};

export default Home;