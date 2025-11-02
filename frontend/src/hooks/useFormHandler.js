/**
 * useFormHandler - Custom hook that wraps React Hook Form
 * 
 * Combines React Hook Form with our custom validation and provides
 * a clean API for handling forms in the application
 * 
 * @param {Object} defaultValues - Initial form values
 * @param {Object} validationSchema - Yup validation schema (optional)
 * @returns {Object} Form handler with methods and state
 * 
 * Example Usage:
 * const { register, handleSubmit, errors, isSubmitting, reset } = useFormHandler({
 *   name: '',
 *   email: ''
 * });
 */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useFormHandler = (defaultValues = {}, validationSchema = null) => {
  const formConfig = {
    defaultValues,
    mode: 'onBlur', // Validate on blur for better UX
    ...(validationSchema && { resolver: yupResolver(validationSchema) })
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
    setValue,
    getValues,
    watch,
    control,
    setError,
    clearErrors,
  } = useForm(formConfig);

  /**
   * Helper to set multiple values at once
   */
  const setValues = (values) => {
    Object.keys(values).forEach((key) => {
      setValue(key, values[key], { shouldDirty: true, shouldValidate: true });
    });
  };

  /**
   * Helper to get form data
   */
  const getFormData = () => getValues();

  /**
   * Helper to check if form has errors
   */
  const hasErrors = () => Object.keys(errors).length > 0;

  return {
    // Core react-hook-form methods
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    reset,
    setValue,
    getValues,
    watch,
    control,
    setError,
    clearErrors,
    
    // Helper methods
    setValues,
    getFormData,
    hasErrors,
  };
};

export default useFormHandler;
