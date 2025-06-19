import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import logger from '../utils/logger';

// Extend the Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Authentication middleware to verify JWT token
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Promise<void>
 */
const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    // Check if the authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required. Please log in.'
      });
      return;
    }
    
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Get the JWT secret from the environment variables
    const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
    
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    
    // Find the user by ID
    const user = await User.findByPk(decoded.id);
    
    // Check if the user exists
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User not found or token invalid'
      });
      return;
    }
    
    // Attach the user to the request object
    req.user = user;
    
    // Continue to the next middleware/controller
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    // Handle different types of JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token. Please log in again.'
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 'error',
        message: 'Token expired. Please log in again.'
      });
    } else {
      // Handle other errors
      res.status(500).json({
        status: 'error',
        message: 'Server error during authentication'
      });
    }
  }
};

export default auth;