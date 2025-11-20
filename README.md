# CryptoTrack 

A full-stack cryptocurrency watchlist tracker application built with Next.js, featuring Role-Based Access Control (RBAC), real-time price tracking via CoinGecko API, comprehensive portfolio management, and advanced admin controls.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [CoinGecko Integration](#coingecko-integration)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

CryptoTrack is a modern web application designed for cryptocurrency enthusiasts to track their portfolio, monitor target prices, and analyze profit/loss in real-time. The application implements a robust RBAC system with enhanced security and user management features:

- **Admin users** can view all user portfolios but cannot edit/delete other users' assets (view-only access)
- **Regular users** can only manage their own assets with full CRUD operations
- **Enhanced UI** with modern landing page, improved forms, and responsive design

The application follows a modular architecture with clear separation between Models, Controllers (API routes), and UI components.

## 📸 Screenshots

### Home Page
![Home Page](https://drive.google.com/uc?export=view&id=1Lxj3C_KicvCFJ3gdh3T9XY9sHXHvujjU)

### User Dashboard
![User Dashboard](https://drive.google.com/uc?export=view&id=1sgzi11d1QUEQ-cNljiHqYCVBLq3QS3X5)

### Admin Dashboard - View 1
![Admin Dashboard 1](https://drive.google.com/uc?export=view&id=1yO1qweP3OjnomVr9CittolsnkYwp3u0e)

### Admin Dashboard - View 2
![Admin Dashboard 2](https://drive.google.com/uc?export=view&id=1zCv-2ArlfowosW7Z-uETbSM_0vC2DF0h)

### Registration Page
![Registration Page](https://drive.google.com/uc?export=view&id=1igsusv2UQL_wkAMMbLyF-xmEJ4a05JwC)

---

## ✨ Features

### Core Functionality
- ✅ **User Authentication**: Secure registration and login with JWT tokens
- ✅ **Enhanced Role-Based Access Control**: 
  - Admin users can view all portfolios but cannot edit/delete other users' assets
  - Regular users have full CRUD access to their own assets only
- ✅ **Smart Asset Management**: 
  - Create, view, update, and delete cryptocurrency assets
  - Dropdown ticker selection with top 7 cryptocurrencies (BTC, ETH, BNB, SOL, ADA, AVAX, DOT)
  - Auto-fill asset names when ticker is selected
- ✅ **Real-Time Price Tracking**: Live price updates via CoinGecko API for 7 major cryptocurrencies
- ✅ **Portfolio Analytics**: Automatic profit/loss calculations with color-coded indicators
- ✅ **Modern Landing Page**: Professional home page with feature highlights and call-to-action
- ✅ **Responsive UI**: Clean, modern interface built with Tailwind CSS

### Advanced Features
- 🔐 **Enhanced Security**: Password hashing with bcryptjs and secure JWT implementation
- 🎫 **Stateless Authentication**: JWT-based authentication with 7-day token validity
- 📊 **Dynamic Visualizations**: 
  - Green/red profit/loss indicators
  - Real-time price updates
  - Portfolio value calculations
- 🔄 **Smart Data Management**: 
  - Automatic price refresh on page load
  - Error handling for API failures
  - Graceful fallbacks for missing data
- 🛡️ **Protected Routes**: All API routes secured with token verification
- 📱 **Mobile-First Design**: Fully responsive across all device sizes
- 👥 **Admin Features**:
  - View all user portfolios with owner information
  - User management capabilities
  - System-wide oversight without data manipulation rights
- 🎯 **User Experience**:
  - Intuitive form validation
  - Loading states and error messages
  - Seamless navigation between pages

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.3** - React framework with Pages Router
- **React 19.2.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose 8.20.0** - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **bcryptjs 3.0.3** - Password hashing

### External APIs
- **CoinGecko API** - Real-time cryptocurrency price data

---

## 🏗️ Architecture

The application follows a **modular, layered architecture**:

```
┌─────────────────────────────────────┐
│         UI Layer (Pages)            │
│  (login, register, dashboard)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      API Layer (Controllers)        │
│  (/api/auth/*, /api/assets/*)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Business Logic (lib/)              │
│  (auth.js, db.js)                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Data Layer (Models)                │
│  (User.js, Asset.js)                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        MongoDB Database             │
└─────────────────────────────────────┘
```

### Design Principles
- **Separation of Concerns**: Models, Controllers, and UI are strictly separated
- **DRY (Don't Repeat Yourself)**: Reusable helper functions in `lib/`
- **Security First**: All API routes protected with JWT verification
- **Scalability**: Modular structure allows easy feature additions

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** or **pnpm**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git** (for version control)

### Optional
- **MongoDB Compass** - GUI for MongoDB (recommended for development)
- **Postman** or **Insomnia** - API testing tools

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd cryptotrack
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables (see [Configuration](#configuration) for details):

```env
MONGODB_URI=mongodb://localhost:27017/cryptotrack
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
NEXT_PUBLIC_CRPYTOGETO=CG-psJNwSECjjPsCjKvfdU2Wtvf
```

### Step 4: Database Setup

Ensure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Step 5: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes | `mongodb://localhost:27017/cryptotrack` |
| `JWT_SECRET` | Secret key for JWT token signing (min 32 chars) | ✅ Yes | `your_super_secret_jwt_key_here` |
| `NEXT_PUBLIC_CRPYTOGETO` | CoinGecko API key (demo or pro) | ⚠️ Optional | `CG-psJNwSECjjPsCjKvfdU2Wtvf` |

### MongoDB Connection String Formats

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/cryptotrack
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cryptotrack?retryWrites=true&w=majority
```

**With Authentication:**
```env
MONGODB_URI=mongodb://username:password@localhost:27017/cryptotrack?authSource=admin
```

### JWT Secret Best Practices

- Use a **strong, random string** (minimum 32 characters)
- **Never commit** secrets to version control
- Use different secrets for development and production
- Generate using: `openssl rand -base64 32`

### CoinGecko API Key

- **Demo Key**: Free tier, starts with `CG-`
- **Pro Key**: Paid tier, different format
- Get your key at: [CoinGecko API](https://www.coingecko.com/en/api)
- The key is exposed to the client (hence `NEXT_PUBLIC_` prefix)

---

## 🗄️ Database Setup

### MongoDB Models

#### User Model (`models/User.js`)
```javascript
{
  username: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

#### Asset Model (`models/Asset.js`)
```javascript
{
  ticker: String (required, uppercase, trimmed),
  name: String (required, trimmed),
  targetPrice: Number (required, min: 0),
  quantity: Number (required, min: 0),
  buyPrice: Number (required, min: 0),
  owner: ObjectId (ref: 'User', required),
  timestamps: true
}
```

### Creating an Admin User

To create an admin user, you can:

1. **Via MongoDB Shell:**
```javascript
use cryptotrack
db.users.insertOne({
  username: "admin",
  email: "admin@example.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt hash
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

2. **Via Registration API** (then manually update role in database)

3. **Via Script** (create `scripts/createAdmin.js`):
```javascript
// scripts/createAdmin.js
import { dbConnect } from '../lib/db.js';
import User from '../models/User.js';
import { hashPassword } from '../lib/auth.js';

await dbConnect();
const hashedPassword = await hashPassword('admin123');
await User.create({
  username: 'admin',
  email: 'admin@example.com',
  password: hashedPassword,
  role: 'admin'
});
```

---

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

- Runs on `http://localhost:3000`
- Hot module replacement enabled
- Detailed error messages

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### Authentication Endpoints

#### POST `/api/auth/register`

Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, invalid email)
- `409` - Email already exists
- `500` - Server error

---

#### POST `/api/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `500` - Server error

---

### Asset Endpoints

#### GET `/api/assets`

Get all assets (RBAC enforced).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "assets": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "ticker": "BTC",
      "name": "Bitcoin",
      "targetPrice": 50000,
      "quantity": 0.5,
      "buyPrice": 42000,
      "owner": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**RBAC Behavior:**
- **Admin**: Returns all assets from all users
- **User**: Returns only assets where `owner` matches their user ID

**Error Responses:**
- `401` - Unauthorized (missing/invalid token)
- `500` - Server error

---

#### POST `/api/assets`

Create a new asset.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "ticker": "BTC",
  "name": "Bitcoin",
  "targetPrice": 50000,
  "quantity": 0.5,
  "buyPrice": 42000
}
```

**Response (201):**
```json
{
  "message": "Asset created successfully",
  "asset": {
    "_id": "507f1f77bcf86cd799439012",
    "ticker": "BTC",
    "name": "Bitcoin",
    "targetPrice": 50000,
    "quantity": 0.5,
    "buyPrice": 42000,
    "owner": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

#### PUT `/api/assets/[id]`

Update an asset (Owner-only access).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "ticker": "BTC",
  "name": "Bitcoin",
  "targetPrice": 55000,
  "quantity": 0.75,
  "buyPrice": 45000
}
```

**Response (200):**
```json
{
  "asset": {
    "_id": "507f1f77bcf86cd799439012",
    "ticker": "BTC",
    "name": "Bitcoin",
    "targetPrice": 55000,
    "quantity": 0.75,
    "buyPrice": 45000,
    "owner": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**RBAC Behavior:**
- **Admin**: Can only update their own assets
- **User**: Can only update their own assets

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (trying to update another user's asset)
- `404` - Asset not found
- `500` - Server error

---

#### DELETE `/api/assets/[id]`

Delete an asset (Owner-only access).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Asset deleted"
}
```

**RBAC Behavior:**
- **Admin**: Can only delete their own assets
- **User**: Can only delete their own assets

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (trying to delete another user's asset)
- `404` - Asset not found
- `500` - Server error

---

## 🔐 Authentication & Authorization

### JWT Token Structure

```json
{
  "sub": "507f1f77bcf86cd799439011",
  "role": "user",
  "iat": 1704067200,
  "exp": 1704672000
}
```

- `sub`: User ID (subject)
- `role`: User role ('user' or 'admin')
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (7 days)

### Token Storage

Tokens are stored in `localStorage` on the client side:
```javascript
localStorage.setItem('token', token);
```

### Role-Based Access Control (RBAC)

#### User Role
- ✅ View own assets only
- ✅ Create own assets
- ✅ Update own assets
- ✅ Delete own assets
- ❌ View other users' assets
- ❌ Modify other users' assets

#### Admin Role (Enhanced Security Model)
- ✅ View all assets from all users
- ✅ See asset owner information (username, email)
- ✅ Create assets (owned by themselves)
- ✅ Update own assets only
- ✅ Delete own assets only
- ❌ **Cannot edit other users' assets** (view-only access)
- ❌ **Cannot delete other users' assets** (view-only access)
- ✅ Access to admin user management features

**Security Enhancement**: Admin users have oversight capabilities but cannot manipulate other users' data, ensuring data integrity and user privacy.

### Security Features

1. **Password Hashing**: bcryptjs with 10 salt rounds
2. **JWT Expiration**: 7-day token validity
3. **Token Verification**: All protected routes verify token
4. **Input Validation**: Mongoose schema validation
5. **SQL Injection Protection**: Mongoose ODM prevents injection
6. **XSS Protection**: React automatically escapes content

---

## 📁 Project Structure

```
cryptotrack/
├── lib/                      # Utility functions
│   ├── auth.js              # Authentication helpers (hash, verify, JWT)
│   └── db.js                # MongoDB connection handler
│
├── models/                   # Mongoose models
│   ├── User.js              # User schema
│   └── Asset.js             # Asset schema
│
├── src/
│   ├── app/                  # Next.js App Router (minimal usage)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.js        # Root layout
│   │   └── page.js          # Home page
│   │
│   ├── components/           # React components
│   │   └── Navbar.jsx       # Navigation component
│   │
│   └── pages/                # Next.js Pages Router
│       ├── _app.jsx         # App wrapper with Navbar
│       ├── login.jsx        # Login page
│       ├── register.jsx     # Registration page
│       ├── dashboard.jsx    # Main dashboard
│       │
│       └── api/              # API routes (Controllers)
│           ├── auth/
│           │   ├── login.js        # POST /api/auth/login
│           │   └── register.js     # POST /api/auth/register
│           │
│           └── assets/
│               ├── index.js        # GET, POST /api/assets
│               └── [id].js         # DELETE /api/assets/:id
│
├── public/                   # Static assets
├── .env.local                # Environment variables (not in git)
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies
└── README.md                # This file
```

### Key Files Explained

- **`lib/auth.js`**: Centralized authentication logic
  - `hashPassword()`: Hash passwords with bcrypt
  - `verifyPassword()`: Verify password against hash
  - `generateToken()`: Create JWT tokens
  - `verifyToken()`: Extract and verify JWT from request

- **`lib/db.js`**: Database connection management
  - Implements connection caching to prevent multiple connections
  - Handles MongoDB connection lifecycle

- **`models/User.js`**: User data model
  - Prevents recompilation errors with `mongoose.models.User || ...`
  - Enforces email uniqueness

- **`models/Asset.js`**: Asset data model
  - References User model via `owner` field
  - Validates numeric fields (min: 0)

---

## 🌐 CoinGecko Integration

### API Endpoint Used

**Simple Price Endpoint:**
```
GET https://api.coingecko.com/api/v3/simple/price
```

### Supported Cryptocurrencies

Currently supports top 7 cryptocurrencies:
- **Bitcoin (BTC)** → `bitcoin`
- **Ethereum (ETH)** → `ethereum`
- **BNB (BNB)** → `binancecoin`
- **Solana (SOL)** → `solana`
- **Cardano (ADA)** → `cardano`
- **Avalanche (AVAX)** → `avalanche-2`
- **Polkadot (DOT)** → `polkadot`

### API Key Configuration

The application automatically detects the API key type:
- **Demo Key** (starts with `CG-`): Uses `x_cg_demo_api_key` parameter
- **Pro Key**: Uses `x_cg_pro_api_key` parameter

### Request Example

```javascript
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,avalanche-2,polkadot&vs_currencies=usd&x_cg_demo_api_key=CG-psJNwSECjjPsCjKvfdU2Wtvf
```

### Response Format

```json
{
  "bitcoin": { "usd": 43250.50 },
  "ethereum": { "usd": 2650.75 },
  "binancecoin": { "usd": 315.20 },
  "solana": { "usd": 98.25 },
  "cardano": { "usd": 0.45 },
  "avalanche-2": { "usd": 35.80 },
  "polkadot": { "usd": 7.25 }
}
```

### Rate Limits

- **Free Tier**: 10-50 calls/minute
- **Pro Tier**: Higher limits (check CoinGecko pricing)

### Error Handling

- Failed API calls are logged but don't break the application
- Missing prices display as `--` in the UI
- Automatic retry on page refresh

### Extending to More Cryptocurrencies

To add more cryptocurrencies:

1. Update `CRYPTO_OPTIONS` in `dashboard.jsx`:
```javascript
const CRYPTO_OPTIONS = [
  { ticker: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
  { ticker: 'ETH', name: 'Ethereum', id: 'ethereum' },
  { ticker: 'BNB', name: 'BNB', id: 'binancecoin' },
  { ticker: 'SOL', name: 'Solana', id: 'solana' },
  { ticker: 'ADA', name: 'Cardano', id: 'cardano' },
  { ticker: 'AVAX', name: 'Avalanche', id: 'avalanche-2' },
  { ticker: 'DOT', name: 'Polkadot', id: 'polkadot' },
  // Add new cryptocurrencies here
];
```

The `COINGECKO_IDS` and `TICKER_TO_ID` are automatically generated from this array.

---

## 🔒 Security Considerations

### Implemented Security Measures

1. **Password Security**
   - Passwords are never stored in plain text
   - bcryptjs with 10 salt rounds
   - Minimum password complexity (can be enhanced)

2. **JWT Security**
   - Tokens expire after 7 days
   - Secret key stored in environment variables
   - Tokens verified on every protected route

3. **API Security**
   - All routes require authentication (except register/login)
   - RBAC prevents unauthorized access
   - Input validation on all endpoints

4. **Database Security**
   - Mongoose prevents SQL injection
   - Schema validation prevents invalid data
   - ObjectId validation on references

### Security Recommendations

1. **Production Checklist**
   - [ ] Use HTTPS in production
   - [ ] Set secure cookie flags for tokens
   - [ ] Implement rate limiting
   - [ ] Add CORS configuration
   - [ ] Use environment-specific secrets
   - [ ] Enable MongoDB authentication
   - [ ] Regular security audits

2. **Additional Enhancements**
   - Implement refresh tokens
   - Add password reset functionality
   - Enable 2FA for admin accounts
   - Add request logging
   - Implement IP whitelisting for admin routes

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error:** `MONGODB_URI environment variable is not defined`

**Solution:**
- Ensure `.env.local` exists in the root directory
- Verify `MONGODB_URI` is set correctly
- Restart the development server after adding env variables

#### 2. JWT Secret Error

**Error:** `JWT_SECRET environment variable is not defined`

**Solution:**
- Add `JWT_SECRET` to `.env.local`
- Use a strong secret (min 32 characters)
- Restart the server

#### 3. CoinGecko API Not Working

**Error:** `Unable to fetch live prices`

**Solutions:**
- Verify API key is correct in `.env.local`
- Check if API key has `NEXT_PUBLIC_` prefix
- Ensure API key is not expired
- Check CoinGecko API status
- Verify network connectivity

#### 4. Hydration Mismatch Error

**Error:** `Hydration failed because the server rendered HTML didn't match the client`

**Solution:**
- This is fixed in the current version
- Ensure you're using the latest code
- Clear `.next` folder and rebuild: `rm -rf .next && npm run dev`

#### 5. Module Not Found Errors

**Error:** `Can't resolve '../../../../../lib/auth'`

**Solution:**
- Verify file paths are correct
- Check import statements match file structure
- Ensure all files are saved
- Restart the development server

#### 6. Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Debug Mode

Enable detailed logging:

```javascript
// In lib/db.js, add:
console.log('MongoDB URI:', process.env.MONGODB_URI);

// In lib/auth.js, add:
console.log('JWT Secret exists:', !!process.env.JWT_SECRET);
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables:**
   - Add `MONGODB_URI`
   - Add `JWT_SECRET`
   - Add `NEXT_PUBLIC_CRPYTOGETO`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (or use `0.0.0.0/0` for Vercel)
5. Get connection string
6. Add to environment variables

### Environment Variables in Production

**Vercel:**
- Settings → Environment Variables
- Add each variable for Production, Preview, and Development

**Other Platforms:**
- Follow platform-specific documentation
- Never commit `.env.local` to version control

### Build Optimization

```bash
# Analyze bundle size
npm run build
# Check .next/analyze for bundle report
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with descriptive messages:**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style

- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Write self-documenting code

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [MongoDB](https://www.mongodb.com) - Database
- [CoinGecko](https://www.coingecko.com) - Cryptocurrency API
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

## 📞 Support

For issues, questions, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/cryptotrack/issues)
- **Email**: your-email@example.com

---

## 📈 Roadmap

### ✅ Recently Completed
- [x] Enhanced admin dashboard with user oversight
- [x] Improved RBAC with admin restrictions
- [x] Asset update functionality (PUT endpoint)
- [x] Dropdown ticker selection with top 7 cryptocurrencies
- [x] Auto-fill asset names
- [x] Modern landing page design
- [x] Enhanced UI/UX across all pages
- [x] Admin user management features

### 🚀 Future Enhancements Planned
- [ ] Real-time price updates (WebSocket)
- [ ] Price alerts (email/push notifications)
- [ ] Historical price charts
- [ ] Advanced portfolio analytics dashboard
- [ ] Multi-currency support (beyond USD)
- [ ] Export data to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Social features (share portfolios)
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and sorting
- [ ] Bulk asset operations
- [ ] API rate limiting and caching

---

**Built with ❤️ using Next.js, MongoDB, and CoinGecko API**
