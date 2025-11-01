// validation.js
// Input validation middleware using express-validator
// Provides reusable validation rules for different entities

const { body, param, validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 * Returns 400 with error details if validation fails
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation failed',
            errors: errors.array() 
        });
    }
    next();
};

/**
 * Validation rules for user registration
 */
const validateUserRegistration = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be 2-100 characters'),
    
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
    
    body('phone')
        .optional()
        .matches(/^[0-9]{10}$/).withMessage('Phone must be exactly 10 digits'),
    
    body('role')
        .optional()
        .isIn(['admin', 'user']).withMessage('Role must be either admin or user'),
    
    validate
];

/**
 * Validation rules for user login
 */
const validateUserLogin = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required'),
    
    body('password')
        .notEmpty().withMessage('Password is required'),
    
    validate
];

/**
 * Validation rules for supplier creation/update
 */
const validateSupplier = [
    body('supplierId')
        .optional()
        .trim()
        .notEmpty().withMessage('Supplier ID is required')
        .isLength({ max: 50 }).withMessage('Supplier ID must not exceed 50 characters'),
    
    body('name')
        .trim()
        .notEmpty().withMessage('Supplier name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    
    body('contactEmail')
        .trim()
        .notEmpty().withMessage('Contact email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),
    
    body('contactPhone')
        .trim()
        .notEmpty().withMessage('Contact phone is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone must be exactly 10 digits'),
    
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5, max: 500 }).withMessage('Address must be 5-500 characters'),
    
    validate
];

/**
 * Validation rules for part creation/update
 */
const validatePart = [
    body('partId')
        .optional()
        .trim()
        .notEmpty().withMessage('Part ID is required'),
    
    body('name')
        .trim()
        .notEmpty().withMessage('Part name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 5, max: 1000 }).withMessage('Description must be 5-1000 characters'),
    
    body('partNumber')
        .trim()
        .notEmpty().withMessage('Part number is required'),
    
    body('quantity')
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    
    body('minimumStock')
        .isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
    
    body('unitPrice')
        .isFloat({ min: 0 }).withMessage('Unit price must be a non-negative number'),
    
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),
    
    body('categoryId')
        .trim()
        .notEmpty().withMessage('Category ID is required'),
    
    validate
];

/**
 * Validation rules for quotation creation
 */
const validateQuotation = [
    body('partId')
        .trim()
        .notEmpty().withMessage('Part ID is required'),
    
    body('partNumber')
        .trim()
        .notEmpty().withMessage('Part number is required'),
    
    body('partName')
        .trim()
        .notEmpty().withMessage('Part name is required'),
    
    body('quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    
    body('supplierIds')
        .isArray({ min: 1 }).withMessage('At least one supplier is required'),
    
    validate
];

/**
 * Validation rules for purchase order creation
 */
const validatePurchaseOrder = [
    body('supplier')
        .notEmpty().withMessage('Supplier is required')
        .isMongoId().withMessage('Invalid supplier ID'),
    
    body('items')
        .isArray({ min: 1 }).withMessage('At least one item is required'),
    
    body('items.*.name')
        .trim()
        .notEmpty().withMessage('Item name is required'),
    
    body('items.*.quantity')
        .isInt({ min: 1 }).withMessage('Item quantity must be at least 1'),
    
    body('items.*.unitPrice')
        .isFloat({ min: 0 }).withMessage('Unit price must be non-negative'),
    
    body('items.*.totalPrice')
        .isFloat({ min: 0 }).withMessage('Total price must be non-negative'),
    
    validate
];

/**
 * Validation for MongoDB ObjectId parameters
 */
const validateMongoId = [
    param('id')
        .isMongoId().withMessage('Invalid ID format'),
    
    validate
];

module.exports = {
    validate,
    validateUserRegistration,
    validateUserLogin,
    validateSupplier,
    validatePart,
    validateQuotation,
    validatePurchaseOrder,
    validateMongoId
};
