# Band Rehearsal Scheduler

A modern web application for bands to efficiently organize rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on member availability.

## 🎵 Features

- **User Management**
  - User registration and authentication
  - Role-based access (band admin, band member, guest)
  - Profile management with instrument/role specification

- **Band Management**
  - Create and manage multiple bands
  - Invite members via email
  - Assign roles within the band

- **Rehearsal Scheduling**
  - Create, edit, and delete rehearsal events
  - Set location, date, time, and duration
  - Recurring rehearsal options

- **Availability Tracking**
  - Members can mark availability (available, unavailable, maybe)
  - Conflict detection with existing events
  - Absence management for extended periods

- **Smart Scheduling**
  - Suggest optimal rehearsal times based on member availability
  - Highlight time slots with maximum attendance

- **Notification System**
  - Email notifications for new rehearsals
  - Reminders before rehearsal (configurable)
  - Changes and cancellation alerts

- **Attendance Tracking**
  - Record attendance at rehearsals
  - View historical attendance statistics
  - Export attendance reports

- **Rehearsal Planning**
  - Create and share setlists for rehearsals
  - Upload and share sheet music/tabs
  - Track song practice progress

- **Venue Management**
  - Store rehearsal space details
  - Track equipment availability
  - Manage venue booking status

- **Mobile Responsiveness**
  - Fully functional on mobile devices
  - Offline capability for viewing scheduled rehearsals

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Redux for global state management
- Material-UI for consistent design elements
- React Big Calendar for event visualization
- Formik with Yup validation
- Axios for HTTP requests

### Backend
- Node.js
- Express.js with TypeScript
- JWT for authentication
- Nodemailer with SendGrid for email notifications
- Socket.io for real-time updates

### Database
- PostgreSQL
- Sequelize ORM
- Redis for caching

### DevOps
- Docker for containerization
- GitHub Actions for CI/CD
- AWS Elastic Beanstalk or Heroku for hosting

## 📦 Project Structure

```
rehearsal-scheduler/
├── client/                     # Frontend React application
│   ├── public/                 # Public assets
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── contexts/           # React contexts
│       ├── hooks/              # Custom React hooks
│       ├── pages/              # Page components
│       ├── redux/              # Redux store, actions, reducers
│       ├── services/           # API service functions
│       ├── types/              # TypeScript type definitions
│       ├── utils/              # Utility functions
│       ├── App.tsx             # Main App component
│       └── index.tsx           # Entry point
├── server/                     # Backend Node.js/Express application
│   ├── config/                 # Configuration files
│   ├── controllers/            # API route controllers
│   ├── middleware/             # Express middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic services
│   ├── utils/                  # Utility functions
│   ├── app.ts                  # Express app setup
│   └── index.ts                # Entry point
├── docker/                     # Docker configuration
├── scripts/                    # Build and deployment scripts
├── .github/                    # GitHub Actions workflows
├── .gitignore                  # Git ignore file
├── README.md                   # Project documentation
└── package.json                # Project dependencies
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)
- Redis (optional, for caching)

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/musicband-rehearsal-scheduler-06192025.git
   cd musicband-rehearsal-scheduler-06192025
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Create `.env` files in both server and client directories based on the provided `.env.example` files

5. Set up the database:
   ```bash
   cd ../server
   npm run db:create
   npm run db:migrate
   npm run db:seed
   ```

6. Start the development servers:
   ```bash
   # In server directory
   npm run dev
   
   # In client directory (in a new terminal)
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

### Docker Setup

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3000`

## 🚢 Deployment

### Option 1: AWS Elastic Beanstalk

1. Create an Elastic Beanstalk environment
2. Configure environment variables
3. Deploy using the EB CLI or GitHub Actions

### Option 2: Heroku

1. Create a Heroku app
2. Configure environment variables
3. Connect GitHub repository and enable automatic deployments

## 🧪 Testing

- Run frontend tests:
  ```bash
  cd client
  npm test
  ```

- Run backend tests:
  ```bash
  cd server
  npm test
  ```

- Run E2E tests:
  ```bash
  npm run test:e2e
  ```

## 📜 API Documentation

API documentation is available at `/api/docs` when running the server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue in the GitHub repository.