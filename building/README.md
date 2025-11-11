# Houseyog Clone - Architectural Design Platform

A complete web application clone of Houseyog.com built for Civil Department project. This application provides architectural design services including house plans, 3D elevations, interior design, and CAD drafting services.

## Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **User Authentication**: Login/Register system with JWT tokens
- **Service Showcase**: Display of all architectural services
- **Package Pricing**: Dynamic pricing packages with features
- **Consultation Booking**: Free consultation request system
- **Project Management**: User dashboard for project tracking
- **Contact Forms**: Multiple contact and inquiry forms
- **Modern UI**: Beautiful animations and smooth interactions

### Backend Features
- **RESTful API**: Complete API with Express.js
- **User Management**: Registration, login, and authentication
- **Project Management**: Create, update, and track projects
- **Consultation System**: Handle consultation requests
- **Package Management**: Dynamic pricing and service packages
- **File Upload**: Support for project files and documents
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: JWT authentication and input validation

## Tech Stack

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- Express Validator
- CORS
- Dotenv

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd building
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
1. Copy the `config.env` file and update the values:
```bash
cp config.env .env
```

2. Update the following variables in `config.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/houseyog_clone
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
```

### Step 4: Database Setup
1. Make sure MongoDB is running on your system
2. Initialize the database with sample data:
```bash
node init-db.js
```

### Step 5: Create Upload Directory
```bash
mkdir uploads
```

### Step 6: Start the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at:
- Frontend: http://localhost:5000
- API: http://localhost:5000/api

## Project Structure

```
building/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # JavaScript functionality
├── models/
│   ├── User.js             # User model
│   ├── Project.js          # Project model
│   ├── Consultation.js     # Consultation model
│   └── Package.js          # Package model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── projects.js         # Project management routes
│   ├── consultations.js    # Consultation routes
│   └── packages.js         # Package routes
├── middleware/
│   └── auth.js             # Authentication middleware
├── uploads/                 # File upload directory
├── server.js               # Main server file
├── init-db.js             # Database initialization
├── package.json            # Dependencies
└── config.env              # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/revisions` - Add project revision

### Consultations
- `POST /api/consultations` - Submit consultation request
- `GET /api/consultations` - Get all consultations (admin)
- `PUT /api/consultations/:id` - Update consultation status

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/category/:category` - Get packages by category
- `POST /api/packages` - Create package (admin)

## Usage Guide

### For Students/Users
1. **Registration**: Create an account to access full features
2. **Browse Services**: Explore available architectural services
3. **Request Consultation**: Submit free consultation requests
4. **Create Projects**: Start new architectural projects
5. **Track Progress**: Monitor project status and revisions
6. **Contact Support**: Use contact forms for inquiries

### For Professors/Administrators
1. **View Consultations**: Access all consultation requests
2. **Manage Projects**: Review and update project status
3. **Package Management**: Modify pricing and service packages
4. **User Management**: Monitor user registrations and activity

## Key Features Explained

### 1. User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints

### 2. Project Management
- Create architectural projects
- Upload project files and documents
- Track project status and revisions
- Real-time updates and notifications

### 3. Consultation System
- Free consultation request form
- Service-specific inquiries
- Plot size and budget information
- Status tracking and follow-up

### 4. Responsive Design
- Mobile-first approach
- Cross-browser compatibility
- Modern UI with smooth animations
- Accessible design patterns

## Customization

### Adding New Services
1. Update the services section in `index.html`
2. Add new service types to the Project model
3. Update the consultation form options
4. Modify the package categories

### Styling Changes
- Modify `frontend/styles.css` for visual changes
- Update color scheme in CSS variables
- Add new animations or transitions
- Customize responsive breakpoints

### Backend Modifications
- Add new API endpoints in route files
- Extend database models for new features
- Implement additional middleware
- Add new validation rules

## Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set `NODE_ENV=production` in environment
2. Use a production MongoDB instance
3. Set up proper JWT secrets
4. Configure file upload limits
5. Set up reverse proxy (nginx)
6. Use PM2 for process management

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/houseyog_clone
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=production_email@gmail.com
EMAIL_PASS=production_email_password
```

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running and connection string is correct
2. **JWT Token Issues**: Check JWT secret configuration
3. **File Upload Problems**: Verify uploads directory exists and has proper permissions
4. **CORS Errors**: Ensure CORS is properly configured for your domain

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of Civil Department coursework.

## Support

For technical support or questions:
- Email: help@houseyog.com
- Phone: +91 75960 58808

## Future Enhancements

- Real-time chat system
- 3D model viewer integration
- Payment gateway integration
- Advanced project analytics
- Mobile app development
- AI-powered design suggestions

