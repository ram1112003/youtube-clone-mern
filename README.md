# YouTube Clone - Creator Studio

A full-featured YouTube clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, video uploads, and a YouTube Creator Studio-style admin dashboard.

## 🚀 Features

- 🔐 **User Authentication** - Register, login, and secure JWT-based authentication
- 📹 **Video Upload & Management** - Upload videos with custom thumbnails and metadata
- 🎯 **Creator Studio Dashboard** - YouTube-style admin dashboard with analytics, video management, and channel insights
- 🌙 **Dark Mode Support** - Authentic YouTube dark theme with toggle
- 🔍 **Search & Filter** - Search videos by title/description and filter by category
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Authentic YouTube UI** - Pixel-perfect YouTube design with Creator Studio theme
- 🔒 **Secure** - File upload validation, rate limiting, and secure password hashing
- 📊 **Analytics** - Video performance metrics and channel growth tracking
- 🎬 **Video Player** - Custom HTML5 video player with YouTube-style controls

## Tech Stack

### Backend
- **Express.js** - Web framework with MVC architecture
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware

### Frontend
- **React.js** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management for authentication

## 📋 Prerequisites for Windows

Before running this application on Windows, make sure you have the following installed:

### Required Software

1. **Node.js (v16 or higher)**
   - Download from: https://nodejs.org/
   - Choose the **LTS (Long Term Support)** version
   - This automatically includes npm (Node Package Manager)
   - After installation, verify by opening Command Prompt and running:
     ```cmd
     node --version
     npm --version
     ```

2. **Visual Studio Code**
   - Download from: https://code.visualstudio.com/
   - Install these **recommended extensions** after installation:
     - ES7+ React/Redux/React-Native snippets
     - Prettier - Code formatter
     - ESLint
     - Thunder Client (for API testing)
     - Auto Rename Tag
     - Bracket Pair Colorizer 2

3. **MongoDB**
   - **Option A: MongoDB Atlas (Recommended for beginners)**
     - Sign up at: https://www.mongodb.com/atlas
     - Create a **free cluster**
     - Get your connection string
   - **Option B: Local MongoDB Installation**
     - Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
     - Follow the Windows installation guide

4. **Git (Recommended)**
   - Download from: https://git-scm.com/download/win
   - Choose default options during installation

## 🛠️ Installation & Setup for Windows VS Code

### Step 1: Download and Open Project

1. **Download the project**:
   - Download the ZIP file and extract it to a location like `C:\Projects\youtube-clone-react-main`
   - Or clone using Git:
   ```bash
   git clone <repository-url>
   ```

2. **Open in VS Code**:
   - Open Visual Studio Code
   - **File** → **Open Folder**
   - Select the `youtube-clone-react-main` folder
   - VS Code will open the entire project

### Step 2: Backend Setup

1. **Open VS Code Terminal**:
   - **View** → **Terminal** (or press `Ctrl + ~`)
   - The terminal will open at the bottom of VS Code

2. **Navigate to backend and install dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Create Environment Variables**:
   - In the `backend` folder, create a file called `.env`
   - Add the following content (replace values as needed):
   
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database Configuration
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/youtube-clone
   # For MongoDB Atlas (replace with your connection string):
   # MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/youtube-clone
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-make-this-long-and-random
   JWT_EXPIRES_IN=7d
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # File Upload Configuration
   MAX_FILE_SIZE=100000000
   ```

4. **Create Upload Directories**:
   ```bash
   mkdir uploads
   mkdir uploads\videos
   mkdir uploads\thumbnails
   ```

### Step 3: Frontend Setup

1. **Open a new terminal tab in VS Code**:
   - Click the **+** icon in the terminal panel
   - Or press `Ctrl + Shift + ~`

2. **Navigate to frontend and install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Create Frontend Environment File (Optional)**:
   - In the `frontend` folder, create `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_UPLOADS_BASE_URL=http://localhost:5000
   ```

### Step 4: Database Setup

**For MongoDB Atlas (Cloud - Recommended)**:
1. Go to https://www.mongodb.com/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file
5. Whitelist your IP address (0.0.0.0/0 for development)

**For Local MongoDB**:
1. Ensure MongoDB service is running:
   - Open **Services** (Windows + R, type `services.msc`)
   - Find "MongoDB Server" and ensure it's running
2. Use the local connection string in `.env`

## 🚀 Running the Application in VS Code

You need to run **both** backend and frontend servers simultaneously:

### Method 1: Using VS Code Split Terminal

1. **Split the terminal**:
   - In VS Code terminal, click the **split terminal** icon (looks like a square divided in half)
   - You'll now have two terminal panes

2. **Start Backend** (Left terminal):
   ```bash
   cd backend
   npm run dev
   ```
   - You should see: `"Server running on port 5000"` and `"Connected to MongoDB"`

3. **Start Frontend** (Right terminal):
   ```bash
   cd frontend
   npm start
   ```
   - Your default browser should automatically open to `http://localhost:3000`
   - If it doesn't, manually navigate to: http://localhost:3000

### Method 2: Using Multiple Terminal Tabs

1. **First Terminal Tab** - Backend:
   ```bash
   cd backend
   npm run dev
   ```

2. **Second Terminal Tab** (Click + to create new tab):
   ```bash
   cd frontend
   npm start
   ```

### Accessing the Application

- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### What You Should See

1. **Terminal Output**:
   - Backend: "Server running on port 5000", "Connected to MongoDB"
   - Frontend: "webpack compiled successfully", "Local: http://localhost:3000"

2. **Browser**: 
   - YouTube clone homepage should load
   - You can register/login and access the Creator Studio dashboard

## 🎯 How to Use the Application

### First Time Setup
1. **Register**: Create a new account on the homepage
2. **Login**: Sign in with your credentials
3. **Access Creator Studio**: You'll be redirected to the YouTube-style dashboard

### Creator Studio Features
1. **Dashboard Tab**: View channel analytics and performance metrics
2. **Upload Tab**: Upload new videos with:
   - Video file (MP4 recommended, max 100MB)
   - Custom thumbnail (JPG/PNG, max 5MB)
   - Title and description
   - Privacy settings (Public/Private)
3. **Content Tab**: Manage existing videos:
   - Edit video details
   - Delete videos
   - View performance stats

### Viewing Videos
1. **Browse Homepage**: View all public videos
2. **Video Player**: Click any video to watch in YouTube-style player
3. **Interactions**: Like, dislike, and view video details

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

### Videos
- `GET /api/videos` - Get all public videos (with search/filter)
- `GET /api/videos/:id` - Get video by ID
- `GET /api/videos/my-videos` - Get user's videos (protected)
- `GET /api/videos/stats` - Get user's video statistics (protected)
- `POST /api/videos/upload` - Upload new video (protected)
- `PUT /api/videos/:id` - Update video (protected)
- `DELETE /api/videos/:id` - Delete video (protected)

## File Upload Limits

- **Videos**: Maximum 100MB per file
- **Thumbnails**: Maximum 5MB per file
- **Supported video formats**: MP4, WebM, AVI, MOV
- **Supported image formats**: JPEG, PNG, GIF, WebP

## 🔧 Troubleshooting Common Windows Issues

### Issue 1: "npm is not recognized"
**Solution**:
- Ensure Node.js is properly installed
- Restart VS Code after Node.js installation
- Restart your computer if needed
- Verify installation: Open Command Prompt and run `node --version`

### Issue 2: "Cannot connect to MongoDB"
**Solution**:
- **For Atlas**: Check your connection string and ensure IP is whitelisted
- **For Local**: Ensure MongoDB service is running in Windows Services
- Check the MongoDB URI in your `.env` file

### Issue 3: "Port 3000/5000 already in use"
**Solution**:
- Kill existing processes:
  ```bash
  netstat -ano | findstr :3000
  taskkill /PID <PID_NUMBER> /F
  ```
- Or change ports in configuration files

### Issue 4: "CORS Error" or "Network Error"
**Solution**:
- Ensure both backend (port 5000) and frontend (port 3000) are running
- Check that backend `.env` has correct `CORS_ORIGIN=http://localhost:3000`
- Clear browser cache and cookies

### Issue 5: "Module not found" errors
**Solution**:
- Delete `node_modules` and `package-lock.json`:
  ```bash
  rmdir /s node_modules
  del package-lock.json
  npm install
  ```

### Issue 6: File upload not working
**Solution**:
- Ensure `uploads` folders exist in backend directory
- Check file size limits (100MB for videos, 5MB for images)
- Verify file permissions

### VS Code Tips for Better Development

1. **Use Extensions**:
   - Install recommended React and Node.js extensions
   - Enable Prettier for code formatting
   - Use ESLint for error detection

2. **Terminal Management**:
   - Use `Ctrl + ~` to toggle terminal
   - Use `Ctrl + Shift + ~` for new terminal
   - Click split icon for side-by-side terminals

3. **Debugging**:
   - Use F5 to start debugging React app
   - Set breakpoints by clicking line numbers
   - Use Console tab in browser (F12) for frontend errors

4. **File Navigation**:
   - `Ctrl + P` for quick file search
   - `Ctrl + Shift + E` for file explorer
   - `Ctrl + Shift + F` for global search

## 📁 Project Structure

```
youtube-clone-react-main/
├── backend/                    # Node.js/Express backend
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── uploads/              # Uploaded files
│   │   ├── videos/           # Video files
│   │   └── thumbnails/       # Thumbnail images
│   ├── .env                  # Environment variables
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── frontend/                  # React frontend
│   ├── public/               # Static files
│   ├── src/                  # React source code
│   │   ├── components/       # React components
│   │   │   ├── Auth/         # Login/Register
│   │   │   ├── Dashboard/    # Creator Studio
│   │   │   ├── VideoPlayer/  # Video player
│   │   │   └── Header/       # Navigation
│   │   ├── context/          # React context (Auth)
│   │   ├── services/         # API services
│   │   └── App.js            # Main App component
│   ├── .env                  # Frontend environment
│   └── package.json          # Frontend dependencies
└── README.md                 # This documentation
```

## 🎨 UI Theme Features

- **Authentic YouTube Design**: Pixel-perfect recreation of YouTube's interface
- **Creator Studio Theme**: Professional dashboard matching YouTube Creator Studio
- **Dark Mode**: Complete dark theme with proper contrast ratios
- **Responsive Design**: Adapts to desktop, tablet, and mobile screens
- **Modern Components**: Material Design inspired buttons and icons
- **Smooth Animations**: Hover effects and transitions throughout the app

## 💻 Complete Command Reference for Windows

### Initial Setup Commands

#### 1. Verify Prerequisites Installation
```cmd
# Check Node.js installation
node --version
npm --version

# Check Git installation (if using Git)
git --version
```

#### 2. Project Download and Setup
```cmd
# Option A: Clone with Git
git clone https://github.com/your-username/youtube-clone-react-main.git
cd youtube-clone-react-main

# Option B: If downloaded as ZIP, extract and navigate
cd C:\Projects\youtube-clone-react-main
```

### Backend Setup Commands

#### 1. Navigate and Install Backend
```cmd
# Navigate to backend directory
cd backend

# Install all backend dependencies
npm install

# Create uploads directories
mkdir uploads
mkdir uploads\videos
mkdir uploads\thumbnails

# Verify backend installation
npm list --depth=0
```

#### 2. Create Backend Environment File
```cmd
# Create .env file (use notepad or VS Code)
echo. > .env

# Or open with notepad to edit
notepad .env
```
**Add this content to .env:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your-super-secret-jwt-key-make-this-long-and-random-123456789
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=100000000
```

### Frontend Setup Commands

#### 1. Navigate and Install Frontend
```cmd
# From project root, navigate to frontend
cd frontend

# Install all frontend dependencies
npm install

# Verify frontend installation
npm list --depth=0
```

#### 2. Create Frontend Environment File (Optional)
```cmd
# Create .env file for frontend
echo. > .env

# Or open with notepad to edit
notepad .env
```
**Add this content to frontend .env:**
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_UPLOADS_BASE_URL=http://localhost:5000
```

### Running the Application Commands

#### Method 1: Using Command Prompt/PowerShell

**Terminal 1 - Backend:**
```cmd
# Navigate to backend
cd backend

# Start backend development server
npm run dev

# Alternative: Start in production mode
npm start
```

**Terminal 2 - Frontend (Open new Command Prompt):**
```cmd
# Navigate to frontend
cd frontend

# Start React development server
npm start
```

#### Method 2: Using VS Code Integrated Terminal

**In VS Code Terminal 1:**
```bash
cd backend
npm run dev
```

**In VS Code Terminal 2:**
```bash
cd frontend
npm start
```

### Development Commands

#### Backend Development
```cmd
# Start backend with auto-reload (development)
npm run dev

# Start backend in production mode
npm start

# Check backend health
curl http://localhost:5000/api/health
# OR open in browser: http://localhost:5000/api/health
```

#### Frontend Development
```cmd
# Start React development server
npm start

# Build for production
npm run build

# Test the build
npm test

# Eject (advanced - not recommended for beginners)
npm run eject
```

### Database Commands

#### MongoDB Local Setup
```cmd
# Check if MongoDB service is running
sc query MongoDB

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Connect to MongoDB (if mongo shell installed)
mongo

# Show databases
show dbs

# Use youtube-clone database
use youtube-clone

# Show collections
show collections
```

### Troubleshooting Commands

#### Port Management
```cmd
# Check what's running on port 3000
netstat -ano | findstr :3000

# Check what's running on port 5000
netstat -ano | findstr :5000

# Kill process by PID (replace XXXX with actual PID)
taskkill /PID XXXX /F

# Kill all Node.js processes (use with caution)
taskkill /IM node.exe /F
```

#### Clean Installation
```cmd
# Backend cleanup
cd backend
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install

# Frontend cleanup
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
```

#### File and Directory Management
```cmd
# List files in current directory
dir

# Navigate to parent directory
cd ..

# Create directory
mkdir folder_name

# Remove directory (with confirmation)
rmdir /s folder_name

# Copy file
copy source.txt destination.txt

# View file content
type filename.txt
```

### Git Commands (if using version control)
```cmd
# Initialize git repository
git init

# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Check commit history
git log --oneline

# Create new branch
git checkout -b feature-branch-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# Push changes
git push origin main
```

### VS Code Specific Commands

#### Open project in VS Code
```cmd
# From project directory
code .

# Open specific file
code README.md

# Open VS Code without project
code
```

#### VS Code Keyboard Shortcuts (Windows)
```
Ctrl + ~          - Toggle terminal
Ctrl + Shift + ~  - New terminal
Ctrl + P          - Quick file search
Ctrl + Shift + P  - Command palette
Ctrl + Shift + E  - File explorer
Ctrl + Shift + F  - Global search
Ctrl + S          - Save file
Ctrl + Shift + S  - Save all files
F5                - Start debugging
Ctrl + C          - Stop running process (in terminal)
```

### Package Management Commands

#### NPM Commands
```cmd
# Install specific package
npm install package-name

# Install as development dependency
npm install package-name --save-dev

# Install globally
npm install -g package-name

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# Check outdated packages
npm outdated

# View package info
npm info package-name

# List installed packages
npm list

# Check npm version
npm --version
```

### Testing and Debugging Commands

#### Backend Testing
```cmd
# Test API endpoints using curl
curl -X GET http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"password123\"}"

# Check backend logs
# (Logs appear in the terminal where you ran npm run dev)
```

#### Frontend Testing
```cmd
# Run React tests
npm test

# Run tests with coverage
npm test -- --coverage

# Check React app in browser
# Open: http://localhost:3000
```

### Deployment Preparation Commands

#### Production Build
```cmd
# Frontend production build
cd frontend
npm run build

# Serve production build locally (install serve globally first)
npm install -g serve
serve -s build -l 3000
```

#### Environment Setup for Production
```cmd
# Create production environment file
copy .env .env.production

# Edit production environment
notepad .env.production
```

## 🛠️ Quick Start Command Summary

**For first-time setup (run these in order):**

1. **Verify prerequisites:**
   ```cmd
   node --version && npm --version
   ```

2. **Setup backend:**
   ```cmd
   cd backend
   npm install
   mkdir uploads\videos uploads\thumbnails
   # Create .env file with database config
   ```

3. **Setup frontend:**
   ```cmd
   cd frontend
   npm install
   ```

4. **Run both servers:**
   ```cmd
   # Terminal 1:
   cd backend && npm run dev
   
   # Terminal 2:
   cd frontend && npm start
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📊 Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=100000000
```

### Frontend (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_UPLOADS_BASE_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
