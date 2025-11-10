/**
 * useFormValidation - Custom hook for form validation
 * 
 * Provides common validation functions and error handling
 * 
 * Example Usage:
 * const { validate, errors, clearError } = useFormValidation();
 * 
 * const isValid = validate('email', value, {
 *   required: true,
 *   email: true
 * });
 */

import { useState, useCallback, useMemo } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  // Validation rules
  const validators = useMemo(() => ({
    required: (value) => {
      if (!value || value.toString().trim() === '') {
        return 'This field is required';
      }
      return null;
    },

    email: (value) => {
      if (!value) return null;
      const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    },

    phone: (value) => {
      if (!value) return null;
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        return 'Phone number must be exactly 10 digits';
      }
      
      // Check if any digit appears more than 4 times
      const digitCount = {};
      for (let digit of value) {
        digitCount[digit] = (digitCount[digit] || 0) + 1;
        if (digitCount[digit] > 4) {
          return 'Invalid phone number pattern';
        }
      }
      return null;
    },

    minLength: (value, minLength) => {
      if (!value) return null;
      if (value.length < minLength) {
        return `Must be at least ${minLength} characters`;
      }
      return null;
    },

    maxLength: (value, maxLength) => {
      if (!value) return null;
      if (value.length > maxLength) {
        return `Must be less than ${maxLength} characters`;
      }
      return null;
    },

    min: (value, min) => {
      if (value === '' || value === null || value === undefined) return null;
      if (Number(value) < min) {
        return `Must be at least ${min}`;
      }
      return null;
    },

    max: (value, max) => {
      if (value === '' || value === null || value === undefined) return null;
      if (Number(value) > max) {
        return `Must be less than ${max}`;
      }
      return null;
    },

    pattern: (value, pattern) => {
      if (!value) return null;
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return 'Invalid format';
      }
      return null;
    },

    alphanumeric: (value) => {
      if (!value) return null;
      const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(value);
      if (hasSpecialChars) {
        return 'Only letters, numbers, and spaces are allowed';
      }
      return null;
    },

    noTripleRepeat: (value) => {
      if (!value) return null;
      const hasTripleRepeat = /(.)\1{2,}/.test(value);
      if (hasTripleRepeat) {
        return 'No character can repeat more than twice';
      }
      return null;
    },
  }), []);

  // Validate a single field
  const validateField = useCallback((fieldName, value, rules) => {
    let error = null;

    for (const [rule, ruleValue] of Object.entries(rules)) {
      if (validators[rule]) {
        error = validators[rule](value, ruleValue);
        if (error) break;
      }
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));

    return error === null;
  }, [validators]);

  // Validate all fields
  const validateForm = useCallback((formData, validationRules) => {
    const newErrors = {};
    let isValid = true;

    for (const [fieldName, rules] of Object.entries(validationRules)) {
      const value = formData[fieldName];
      
      for (const [rule, ruleValue] of Object.entries(rules)) {
        if (validators[rule]) {
          const error = validators[rule](value, ruleValue);
          if (error) {
            newErrors[fieldName] = error;
            isValid = false;
            break;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [validators]);

  // Clear error for a specific field
  const clearError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearAllErrors,
  };
};

export default useFormValidation;
