# 📊 Utthan Student Dashboard

A full-stack web application for analyzing student performance data across wards, providing real-time insights into reading, writing, and numeracy levels.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **📈 Examination Analytics**: Comprehensive visualization of student performance metrics
- **📊 Interactive Charts**: Dynamic pie charts and bar graphs with download and copy functionality
- **🎯 Learning Distribution Analysis**: View student levels (L0-L5) across subjects
- **📋 Student Records Management**: Searchable, filterable table with Excel export
- **🌓 Dark Mode**: Seamless light/dark theme switching
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🎨 Modern UI**: Glassmorphism effects, gradient backgrounds, and smooth animations

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **XLSX** - Excel export functionality
- **HTML2Canvas** - Chart image capture

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
student-dashboard/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   └── api.js       # API service layer
│   └── package.json
├── server/              # Express backend
│   ├── routes/          # API routes
│   ├── seed/            # Database seeding scripts
│   └── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-dashboard.git
   cd student-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/student_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb student_db

   # Run database migrations/seed (if available)
   cd server
   npm run seed
   ```

5. **Start the development servers**

   **Option 1: Using run.bat (Windows)**
   ```bash
   # From the root directory
   run.bat
   ```

   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm start

   # Terminal 2 - Start frontend
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📖 Usage

### Student Records
- View paginated student records with filters
- Export data to Excel with current filters applied
- Sort and search through student information

### Analytics Dashboard
- View ward-wise attendance summaries
- Analyze learning distribution across Reading, Writing, and Numeracy
- Download or copy charts as images

### Filters
- Filter by Class, Ward, School, and Medium
- Real-time data updates based on selected filters

## 🎨 Key Features Breakdown

### Export to Excel
Click the "Export to Excel" button in the Student Records section to download all filtered student data as a `.xlsx` file.

### Chart Download & Copy
Each chart includes:
- **Download** button - Save chart as PNG image
- **Copy** button - Copy chart to clipboard for pasting

### Animated Gradient Background
The Examination page features a dynamic, animated gradient background with glassmorphism effects for a modern look.

## 🔒 Authentication

The application uses JWT-based authentication:
- Protected routes require valid tokens
- Tokens are stored securely in cookies
- Passwords are hashed using bcrypt

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

## 📦 Build for Production

```bash
# Build frontend
cd client
npm run build

# Build output will be in client/dist
```

## 🚢 Deployment

The application can be deployed on platforms like:
- **Vercel** (Frontend)
- **Render/Railway** (Backend + Database)
- **Heroku**

See `vercel.json` for Vercel configuration.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Sarvesh Singh** - Software Development Engineer

## 🙏 Acknowledgments

- Student assessment data providers
- Open-source community for excellent tools and libraries

---

Made with ❤️ for better education analytics
