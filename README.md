<<<<<<< HEAD
# MailTrace - Email Analysis System

A full-stack application that automatically identifies the receiving chain and ESP type of emails using IMAP analysis.

## 🚀 Features


## 🏗️ Architecture

### Frontend (Next.js)

### Backend (NestJS)

## 📋 Prerequisites


## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd lucid-growth
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mailtrace

# IMAP Configuration
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASS=your-app-password
TEST_SUBJECT=MailTrace Test — 12345

# Server
PORT=8080
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create environment file
cp .env.example .env.local
```

Configure your `.env.local` file:
```env
# Backend API
NEXT_PUBLIC_API_BASE=http://localhost:8080
NODE_ENV=development
```

### 4. Database Setup
Make sure MongoDB is running:
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or start your local MongoDB service
mongod
```

## 🚀 Running the Application

### Development Mode

1. **Start Backend**:
```bash
cd backend
npm run start:dev
```
Backend will run on `http://localhost:8080`

2. **Start Frontend**:
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build Backend**:
```bash
cd backend
npm run build
npm start
```

2. **Build Frontend**:
```bash
cd frontend
npm run build
npm start
```

## 📡 API Endpoints

### Backend API (Port 8080)


### Frontend API (Port 3000)


## 🎯 Usage

1. **Configure Email**: Set up your IMAP credentials in backend `.env`
2. **Start Services**: Run both backend and frontend
3. **Send Test Email**: Send an email to the displayed address with the specified subject
4. **View Results**: Check the Results page for analysis

## 🔧 Configuration

### IMAP Setup (Gmail Example)

1. Enable 2-Factor Authentication
2. Generate App Password
3. Use app password in `IMAP_PASS`

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/mailtrace
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASS=your-app-password
TEST_SUBJECT=MailTrace Test — 12345
PORT=8080
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set `NEXT_PUBLIC_API_BASE` to your backend URL
3. Deploy automatically

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
lucid-growth/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── modules/
│   │   │   └── email/      # Email analysis module
│   │   └── main.ts         # Application entry point
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and API client
│   │   └── styles/       # Global styles
│   └── package.json
└── README.md
```

## 🔍 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Check if backend is running on port 8080
   - Verify `NEXT_PUBLIC_API_BASE` in frontend
   - Check CORS configuration

2. **IMAP Connection Issues**
   - Verify IMAP credentials
   - Check if 2FA is enabled (use app password)
   - Ensure IMAP is enabled in email settings

3. **Database Connection**
   - Verify MongoDB is running
   - Check `MONGODB_URI` in backend `.env`
   - Ensure database permissions

### Debug Mode

Enable debug logging:
```bash
# Backend
DEBUG=* npm run start:dev

# Frontend
NODE_ENV=development npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:


**MailTrace** - Professional Email Analysis Made Simple 🚀
=======
# Email-Analyzer
>>>>>>> origin/main
