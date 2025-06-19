import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate request using express-validator
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns void
 */
const validate = (req: Request, res: Response, next: NextFunction): void => {
  // Check for validation errors
  const errors = validationResult(req);
  
  // If there are validation errors, return 400 with error details
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }))
    });
    return;
  }
  
  // If no errors, proceed to the next middleware/controller
  next();
};

export default validate;