#!/bin/bash

# YouTube Clone - Development Startup Script

echo "🚀 Starting YouTube Clone Development Environment..."
echo "=============================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongodb"
    echo "   or"
    echo "   mongod"
    exit 1
fi

echo "✅ MongoDB is running"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is available"

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo "✅ Dependencies are ready"

# Start both frontend and backend
echo "🔥 Starting backend and frontend servers..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both servers"
echo "=============================================="

npm run dev
