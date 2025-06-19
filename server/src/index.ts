import dotenv from 'dotenv';
import app from './app';
import http from 'http';
import { Server } from 'socket.io';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io events
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  // Join a band room
  socket.on('join-band', (bandId: string) => {
    socket.join(`band-${bandId}`);
    logger.info(`Socket ${socket.id} joined band ${bandId}`);
  });

  // Leave a band room
  socket.on('leave-band', (bandId: string) => {
    socket.leave(`band-${bandId}`);
    logger.info(`Socket ${socket.id} left band ${bandId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api/docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.name, err.message);
  
  // Exit process
  process.exit(1);
});

export { io };