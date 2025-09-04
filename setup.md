# MailTrace Setup Guide

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with your configuration
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/mailtrace
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASS=your-app-password
TEST_SUBJECT=MailTrace Test — 12345
PORT=8080
NODE_ENV=development
EOF

npm run start:dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_BASE=http://localhost:8080
NODE_ENV=development
EOF

npm run dev
```

### 3. Database Setup
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or start local MongoDB
mongod
```

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `IMAP_HOST`: IMAP server hostname
- `IMAP_PORT`: IMAP server port (usually 993)
- `IMAP_USER`: Your email address
- `IMAP_PASS`: Your email password or app password
- `TEST_SUBJECT`: Subject line to identify test emails
- `PORT`: Backend server port (default: 8080)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_BASE`: Backend API URL (default: http://localhost:8080)

## Gmail IMAP Setup

1. Enable 2-Factor Authentication in Gmail
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `IMAP_PASS`

## Testing the Connection

1. Start both backend and frontend
2. Open http://localhost:3000
3. Check if the email address and subject are displayed
4. Send a test email to the displayed address
5. Check the Results page for analysis

## Troubleshooting

### Backend not connecting
- Check if backend is running on port 8080
- Verify MongoDB is running
- Check IMAP credentials

### Frontend not loading data
- Verify `NEXT_PUBLIC_API_BASE` is set correctly
- Check browser console for errors
- Ensure backend is accessible

### IMAP connection issues
- Verify email credentials
- Check if IMAP is enabled in email settings
- Use app password for Gmail
