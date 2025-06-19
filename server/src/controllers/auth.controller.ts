import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import logger from '../utils/logger';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token for a user
 * 
 * @param userId - User ID to include in the token
 * @returns string - JWT token
 */
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

/**
 * Register a new user
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({
        status: 'error',
        message: 'Email already in use'
      });
      return;
    }

    // Create new user
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password, // Will be hashed by model hook
      phone
    });

    // Generate JWT token
    const token = generateToken(newUser.id);

    // Return user data (without password) and token
    res.status(201).json({
      status: 'success',
      data: newUser.toJSON(),
      token
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to register user'
    });
  }
};

/**
 * Login a user
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    // Check if user exists
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid credentials'
      });
      return;
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Return user data (without password) and token
    res.status(200).json({
      status: 'success',
      data: user.toJSON(),
      token
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to login'
    });
  }
};

/**
 * Get current user
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // User is attached to request by auth middleware
    res.status(200).json({
      status: 'success',
      data: req.user.toJSON()
    });
  } catch (error) {
    logger.error('Get current user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user'
    });
  }
};

/**
 * Logout a user
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since we're using JWT, we don't need to do anything on the server
    // The client should remove the token from storage
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to logout'
    });
  }
};