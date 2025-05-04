import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { useForm } from '../../hooks/useForm';
import emailjs from '@emailjs/browser';
import '../../styles/sections/contact.css';

const Contact = () => {
  const contactRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validateForm = (values) => {
    const errors = {};
    
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 20) {
      errors.message = 'Message must be at least 20 characters long';
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // EmailJS template params
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
        reply_to: values.email
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitSuccess(true);
      resetForm();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { 
    values, 
    errors, 
    handleChange, 
    handleBlur, 
    handleSubmitForm,
    resetForm,
    isValid
  } = useForm(initialFormState, validateForm, handleSubmit);

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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Let's work together on your next project"
          centered
        />
        
        <div className="contact-content" ref={contactRef}>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Manila, Philippines</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>zild.abule@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <h4>Phone</h4>
                <p>+63 912 345 6789</p>
              </div>
            </div>
            
            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="social-links">
                <a href="https://github.com/zildabule" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com/in/zildabule" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com/zildabule" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/zildabule" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
                <Button 
                  variant="primary" 
                  onClick={() => setSubmitSuccess(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmitForm}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name ? 'error' : ''}
                      disabled={isSubmitting}
                      placeholder="John Doe"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email ? 'error' : ''}
                      disabled={isSubmitting}
                      placeholder="john@example.com"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.subject ? 'error' : ''}
                    disabled={isSubmitting}
                    placeholder="What is this about?"
                  />
                  {errors.subject && <div className="error-message">{errors.subject}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.message ? 'error' : ''}
                    disabled={isSubmitting}
                    placeholder="Tell me about your project or question..."
                  ></textarea>
                  {errors.message && <div className="error-message">{errors.message}</div>}
                </div>
                
                {submitError && (
                  <div className="error-message form-error">{submitError}</div>
                )}
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  isFullWidth={true}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;