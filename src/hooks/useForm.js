import { useState, useEffect } from 'react';

/**
 * Custom hook for form handling with validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function that returns errors object
 * @param {Function} onSubmit - Function to call on successful form submission
 */
export const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Update form validity when errors change
  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;
    const formTouched = Object.keys(touched).length > 0;
    setIsValid(noErrors && formTouched);
  }, [errors, touched]);

  // Validate fields when values change (if touched)
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate, touched]);

  // Handle form submission
  useEffect(() => {
    if (isSubmitting) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        onSubmit();
      }
      
      setIsSubmitting(false);
    }
  }, [isSubmitting, validate, values, onSubmit]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  // Handle form submission
  const handleSubmitForm = (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(initialValues).forEach(key => {
      allTouched[key] = true;
    });
    
    setTouched(allTouched);
    setIsSubmitting(true);
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmitForm,
    resetForm,
    isSubmitting
  };
};