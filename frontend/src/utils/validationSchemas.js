/**
 * Validation Schemas using Yup
 * 
 * Centralized validation schemas for all forms in the application
 * These work with React Hook Form via @hookform/resolvers/yup
 */

import * as yup from 'yup';

/**
 * Custom validators
 */
const phoneValidator = yup.string()
  .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
  .test('no-repeat', 'Invalid phone number pattern', (value) => {
    if (!value) return true;
    // Check if any digit appears more than 4 times
    const digitCount = {};
    for (let digit of value) {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
      if (digitCount[digit] > 4) {
        return false;
      }
    }
    return true;
  });

const nameValidator = yup.string()
  .matches(/^[a-zA-Z0-9\s]*$/, 'Only letters, numbers, and spaces are allowed')
  .test('no-triple', 'No character can repeat more than twice consecutively', (value) => {
    if (!value) return true;
    return !/(.)\1{2,}/.test(value);
  });

/**
 * Supplier Form Schema
 */
export const supplierSchema = yup.object().shape({
  supplierId: yup.string()
    .required('Supplier ID is required')
    .min(2, 'Supplier ID must be at least 2 characters')
    .max(20, 'Supplier ID must not exceed 20 characters'),
  
  name: nameValidator
    .required('Supplier name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  
  contactEmail: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(/^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'),
  
  contactPhone: phoneValidator
    .required('Phone number is required'),
  
  address: yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters'),
  
  reportId: yup.string()
    .max(50, 'Report ID must not exceed 50 characters')
});

/**
 * Part Form Schema
 */
export const partSchema = yup.object().shape({
  partId: yup.string()
    .required('Part ID is required')
    .min(2, 'Part ID must be at least 2 characters')
    .max(20, 'Part ID must not exceed 20 characters'),
  
  name: nameValidator
    .required('Part name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  
  description: yup.string()
    .max(500, 'Description must not exceed 500 characters'),
  
  partNumber: yup.string()
    .required('Part number is required')
    .min(2, 'Part number must be at least 2 characters')
    .max(50, 'Part number must not exceed 50 characters'),
  
  quantity: yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity cannot be negative')
    .integer('Quantity must be a whole number'),
  
  minimumStock: yup.number()
    .required('Minimum stock is required')
    .min(0, 'Minimum stock cannot be negative')
    .integer('Minimum stock must be a whole number'),
  
  unitPrice: yup.number()
    .required('Unit price is required')
    .min(0, 'Unit price cannot be negative')
    .test('decimal', 'Price can have maximum 2 decimal places', (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  
  location: yup.string()
    .max(100, 'Location must not exceed 100 characters'),
  
  categoryId: yup.string()
    .required('Category ID is required')
    .max(50, 'Category ID must not exceed 50 characters'),
  
  reportId: yup.string()
    .max(50, 'Report ID must not exceed 50 characters')
});

/**
 * Purchase Order Form Schema
 */
export const purchaseOrderSchema = yup.object().shape({
  poNumber: yup.string()
    .required('PO Number is required')
    .min(2, 'PO Number must be at least 2 characters')
    .max(50, 'PO Number must not exceed 50 characters'),
  
  supplier: yup.string()
    .required('Supplier is required'),
  
  orderDate: yup.date()
    .required('Order date is required')
    .max(new Date(), 'Order date cannot be in the future'),
  
  expectedDeliveryDate: yup.date()
    .required('Expected delivery date is required')
    .min(yup.ref('orderDate'), 'Delivery date must be after order date'),
  
  status: yup.string()
    .required('Status is required')
    .oneOf(['Pending', 'Approved', 'Received', 'Cancelled'], 'Invalid status'),
  
  totalAmount: yup.number()
    .required('Total amount is required')
    .min(0, 'Total amount cannot be negative')
    .test('decimal', 'Amount can have maximum 2 decimal places', (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  
  items: yup.array()
    .of(
      yup.object().shape({
        part: yup.string().required('Part is required'),
        quantity: yup.number()
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1')
          .integer('Quantity must be a whole number'),
        unitPrice: yup.number()
          .required('Unit price is required')
          .min(0, 'Unit price cannot be negative'),
      })
    )
    .min(1, 'At least one item is required'),
  
  notes: yup.string()
    .max(500, 'Notes must not exceed 500 characters')
});

/**
 * User Registration Schema
 */
export const registerSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
  
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

/**
 * User Login Schema
 */
export const loginSchema = yup.object().shape({
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup.string()
    .required('Password is required')
});

/**
 * Profile Update Schema
 */
export const profileSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  currentPassword: yup.string()
    .when('newPassword', {
      is: (val) => val && val.length > 0,
      then: (schema) => schema.required('Current password is required to change password'),
      otherwise: (schema) => schema
    }),
  
  newPassword: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
  
  confirmNewPassword: yup.string()
    .when('newPassword', {
      is: (val) => val && val.length > 0,
      then: (schema) => schema
        .required('Please confirm your new password')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
      otherwise: (schema) => schema
    })
});

/**
 * Quotation Schema
 */
export const quotationSchema = yup.object().shape({
  supplier: yup.string()
    .required('Supplier is required'),
  
  partId: yup.string()
    .required('Part is required'),
  
  quantity: yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .integer('Quantity must be a whole number'),
  
  unitPrice: yup.number()
    .required('Unit price is required')
    .min(0, 'Unit price cannot be negative'),
  
  validUntil: yup.date()
    .required('Valid until date is required')
    .min(new Date(), 'Valid until date must be in the future'),
  
  notes: yup.string()
    .max(500, 'Notes must not exceed 500 characters')
});
