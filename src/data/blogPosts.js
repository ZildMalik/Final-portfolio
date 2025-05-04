// Move these images to the public folder or import them properly

const blogPosts = [
  {
    id: 1,
    title: "How I Built a Responsive Portfolio with React",
    slug: "responsive-portfolio-react",
    excerpt: "Learn the process and techniques I used to create a fully responsive portfolio website using React and modern CSS.",
    content: `
# How I Built a Responsive Portfolio with React

![Responsive Design](/images/blog/blog1-1.jpg)

## Introduction

Creating a responsive portfolio is essential for showcasing your work across different devices. In this post, I'll walk through the process of building a portfolio site using React and modern CSS techniques.

## Planning the Structure

Before writing any code, I planned the structure of my portfolio to include these key sections:

- Hero/Landing
- About
- Experience
- Projects
- Blog
- Contact

This organization helps visitors navigate the site easily and find the information they need quickly.

## Setting Up the React Project

I started by creating a new project using Vite, which provides a faster and leaner development experience compared to Create React App:

  \`\`\`bash
  npm create vite@latest my-portfolio -- --template react
  cd my-portfolio
  npm install
  \`\`\`

## Creating a Responsive Design System

![CSS Variables](/images/blog/blog1-2.jpg)

Instead of using a CSS framework, I created a custom design system using CSS variables:

\`\`\`css
:root {
  /* Colors */
  --color-primary: #ff6b00;
  --color-dark: #0f0f0f;
  --color-light: #ffffff;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Font sizes */
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-xxl: 2rem;
}
\`\`\`

This approach made it easy to maintain consistent styling throughout the site and quickly adjust values when needed.

## Implementing Responsive Layouts

For the layout, I used CSS Grid and Flexbox, which provide powerful tools for creating responsive designs:

\`\`\`css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
  }
}
\`\`\`

## Creating Reusable Components

I created reusable components like Button, Card, and SectionHeading to maintain consistency and reduce redundancy:

\`\`\`jsx
const Button = ({ children, variant, size, ...props }) => {
  return (
    <button 
      className={\`btn btn--\${variant} btn--\${size}\`} 
      {...props}
    >
      {children}
    </button>
  );
};
\`\`\`

## Adding Smooth Animations

To enhance the user experience, I added subtle animations using CSS transitions and keyframes:

\`\`\`css
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
\`\`\`

## Implementing Dark Mode

I also added a dark mode toggle using React context and CSS variables:

\`\`\`jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

## Conclusion

Building a responsive portfolio with React allowed me to create a showcase that works well on all devices while maintaining a clean codebase. The combination of modern CSS features and React's component-based architecture made the development process efficient and enjoyable.

I hope this overview helps you in building your own portfolio. Feel free to reach out if you have any questions!
    `,
    coverImage: "/images/blog/blog1-1.jpg",
    images: [
      {
        url: "/images/blog/blog1-1.jpg",
        alt: "Responsive Design showcase",
        caption: "Responsive design across different devices"
      },
      {
        url: "/images/blog/blog1-2.jpg",
        alt: "CSS Variables implementation",
        caption: "Using CSS variables for consistent theming"
      },
      {
        url: "/images/blog/blog1-3.jpg",
        alt: "Component architecture",
        caption: "React component structure for the portfolio"
      }
    ],
    date: "2024-08-15",
    category: "Web Development",
    author: "Zild Abule"
  },

  {
    id: 2,
    title: "Optimizing React Performance: Tips and Tricks",
    slug: "optimizing-react-performance",
    excerpt: "Discover practical techniques to improve your React application's performance and provide a better user experience.",
    content: `
# Optimizing React Performance: Tips and Tricks

![React Performance](/images/blog/blog2-1.jpg)

## Introduction

Performance optimization is crucial for providing a smooth user experience in React applications. In this post, I'll share some practical techniques that have helped me improve performance in my projects.

## Use React.memo for Component Memoization

React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders when the props haven't changed:

\`\`\`jsx
const MyComponent = React.memo(function MyComponent(props) {
  // Your component logic
});
\`\`\`

This is particularly useful for components that render often with the same props.

## Implement Code Splitting

Code splitting allows you to split your bundle into smaller chunks that can be loaded on demand, improving initial load time:

\`\`\`jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Virtualize Long Lists

When rendering long lists, virtualization helps by only rendering items that are currently visible in the viewport:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function MyList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

## Use useCallback and useMemo Hooks

These hooks help prevent unnecessary calculations and function recreations:

\`\`\`jsx
import { useCallback, useMemo } from 'react';

function MyComponent({ data, onItemClick }) {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  // Memoize callback functions
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    // Component JSX
  );
}
\`\`\`

## Implement Proper State Management

Organize your state to avoid unnecessary re-renders:

\`\`\`jsx
// Instead of this
const [user, setUser] = useState({
  name: 'Alex',
  address: {
    city: 'San Francisco',
    state: 'CA'
  }
});

// Consider splitting into multiple state variables
const [name, setName] = useState('Alex');
const [address, setAddress] = useState({
  city: 'San Francisco',
  state: 'CA'
});
\`\`\`

## Optimize Images and Assets

Use proper image formats and sizes:

1. Use WebP format where supported
2. Implement responsive images with srcset
3. Lazy load images that are not in the initial viewport

\`\`\`jsx
<img 
  src="small.jpg"
  srcSet="medium.jpg 1000w, large.jpg 2000w"
  alt="Responsive image"
  loading="lazy"
/>
\`\`\`

## Use Production Builds

Always use production builds for deployment:

\`\`\`bash
npm run build
\`\`\`

This ensures that development features like detailed warnings are stripped out, resulting in a smaller bundle size.

## Conclusion

Implementing these performance optimization techniques has significantly improved the user experience in my React applications. Remember that premature optimization is the root of all evil, so measure performance first and optimize where needed.

What performance techniques have worked well in your projects? I'd love to hear about your experiences!
    `,
    coverImage: "/images/blog/blog2-1.jpg",
    images: [
      {
        url: "/images/blog/blog2-1.jpg",
        alt: "React Performance Overview",
        caption: "Visual guide to React performance optimization"
      },
      {
        url: "/images/blog/blog2-2.jpg", 
        alt: "Code splitting visualization",
        caption: "How code splitting improves load times"
      },
      {
        url: "/images/blog/blog2-3.jpg",
        alt: "React hooks performance",
        caption: "Using React hooks for better performance"
      }
    ],
    date: "2024-09-22",
    category: "React",
    author: "Zild Abule"
  },
  {
    id: 3,
    title: "Creating Custom Hooks in React: A Practical Guide",
    slug: "creating-custom-hooks-react",
    excerpt: "Learn how to create and use custom hooks to share logic between components and make your React code more reusable.",
    content: `
# Creating Custom Hooks in React: A Practical Guide

![React Hooks](/images/blog/blog3-1.jpg)

## Introduction

Custom hooks are one of the most powerful features in React, allowing you to extract and reuse stateful logic between components. In this post, I'll show you how to create practical custom hooks that will make your code more maintainable and DRY (Don't Repeat Yourself).

## What Are Custom Hooks?

Custom hooks are JavaScript functions that start with the word "use" and may call other hooks. They let you extract component logic into reusable functions.

## Why Create Custom Hooks?

- **Code Reusability**: Share logic between components
- **Separation of Concerns**: Keep components focused on rendering
- **Cleaner Components**: Move complex logic outside components
- **Testability**: Easier to test isolated logic

## Building a useForm Hook

Let's create a custom hook for form handling, a common task in React applications:

\`\`\`jsx
import { useState, useEffect } from 'react';

function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Check form validity when errors change
  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  // Validate when values change if the field has been touched
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validate(values));
    }
  }, [values, validate, touched]);

  // Handle submission if isSubmitting is true
  useEffect(() => {
    if (isSubmitting && isValid) {
      onSubmit(values);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting, isValid, onSubmit, values]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  // Mark field as touched when blurred
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    setErrors(validate(values));
  };

  // Handle form submission
  const handleSubmitForm = (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(values).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    
    // Validate all fields
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmitForm,
    resetForm
  };
}

export default useForm;
\`\`\`

## Creating a useLocalStorage Hook

Another useful custom hook is one that synchronizes state with localStorage:

\`\`\`jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get stored value from localStorage or use initialValue
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  // State to store our value
  const [value, setValue] = useState(getStoredValue);

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
\`\`\`

## Building a useIntersectionObserver Hook

This hook is perfect for implementing lazy loading or animations when elements enter the viewport:

\`\`\`jsx
import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

export default useIntersectionObserver;
\`\`\`

## Using Custom Hooks in Components

Here's how you might use these custom hooks in a component:

\`\`\`jsx
function ContactForm() {
  const initialValues = { name: '', email: '', message: '' };
  
  const validateForm = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.message) errors.message = 'Message is required';
    return errors;
  };
  
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Send data to server
  };
  
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmitForm
  } = useForm(initialValues, validateForm, handleSubmit);
  
  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      
      {/* Other form fields */}
      
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
\`\`\`

## Conclusion

Custom hooks are a powerful way to organize and reuse logic in your React applications. They help keep your components clean and focused on rendering, while complex logic can be extracted and shared across your application.

Start by identifying repeated patterns in your components and consider if they could be extracted into custom hooks. Your future self will thank you for the maintainable and DRY code!

What custom hooks have you created that you find particularly useful? Share your experiences in the comments!
    `,
    coverImage: "/images/blog/blog3-1.jpg",
    images: [
      {
        url: "/images/blog/blog3-1.jpg",
        alt: "Custom React Hooks Overview",
        caption: "Understanding custom hooks in React"
      },
      {
        url: "/images/blog/blog3-2.jpg",
        alt: "useForm hook implementation",
        caption: "Building a custom useForm hook"
      },
      {
        url: "/images/blog/blog3-3.jpg",
        alt: "Custom hooks architecture",
        caption: "Custom hooks architecture patterns"
      }
    ],
    date: "2024-10-10",
    category: "React",
    author: "Zild Abule"
  }
];

export default blogPosts;