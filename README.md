# CryptoTrack 

A full-stack cryptocurrency watchlist tracker application built with Next.js,a featuring Role-Based Access Control (RBAC), real-time price tracking via CoinGecko API, comprehensive portfolio management, and advanced admin controls.

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
![Home Page](https://drive.google.com/file/d/1Lxj3C_KicvCFJ3gdh3T9XY9sHXHvujjU/view?usp=sharing)

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
NEXT_PUBLIC_CRPYTOGETO=your_coingecko_api_key_here
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
| `MONGODB_URI` | MongoDB connection string |  Yes | `mongodb://localhost:27017/cryptotrack` |
| `JWT_SECRET` | Secret key for JWT token signing (min 32 chars) |  Yes | `your_super_secret_jwt_key_here` |
| `NEXT_PUBLIC_CRPYTOGETO` | CoinGecko API key (demo or pro) | Yes | `CG-fhgkfdhgfg` |

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

To create an admin user, you can use the following methods:

#### Default Admin Credentials
For testing and initial setup, use these credentials:
- **Email**: `admin@cryptotrack.com`
- **Password**: `admin123`

#### Method 1: Via MongoDB Shell
```javascript
use cryptotrack
db.users.insertOne({
  username: "admin",
  email: "admin@cryptotrack.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt hash of 'admin123'
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### Method 2: Via Registration API
1. Register normally with email `admin@cryptotrack.com`
2. Manually update the role in database:
```javascript
db.users.updateOne(
  { email: "admin@cryptotrack.com" },
  { $set: { role: "admin" } }
)
```

#### Method 3: Via Script (Recommended)
Use the provided script `scripts/create-admin.mjs`:
```javascript
// scripts/create-admin.mjs
import { dbConnect } from '../lib/db.js';
import User from '../models/User.js';
import { hashPassword } from '../lib/auth.js';

await dbConnect();
const hashedPassword = await hashPassword('admin123');
await User.create({
  username: 'admin',
  email: 'admin@cryptotrack.com',
  password: hashedPassword,
  role: 'admin'
});
console.log('Admin user created successfully!');
```

Run the script:
```bash
node scripts/create-admin.mjs
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

### Interactive API Documentation

#### Swagger/OpenAPI Documentation

For interactive API testing and documentation, you can set up Swagger UI:

**Installation:**
```bash
npm install swagger-ui-express swagger-jsdoc
```

**Setup (Optional Enhancement):**
Create `pages/api/docs.js` for Swagger UI endpoint:
```javascript
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CryptoTrack API',
      version: '1.0.0',
      description: 'Cryptocurrency portfolio tracking API with RBAC',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./pages/api/**/*.js'], // Path to API files
};

const specs = swaggerJsdoc(options);
export default swaggerUi.setup(specs);
```

**Access Swagger UI:**
- Visit: `http://localhost:3000/api/docs`
- Interactive API testing interface
- Try endpoints directly in browser
- Download OpenAPI specification

#### Postman Collection

**Import Collection:**
1. Download the Postman collection: [CryptoTrack API Collection](./docs/CryptoTrack-API.postman_collection.json)
2. Open Postman → Import → Upload the JSON file
3. Set environment variables:
   - `baseUrl`: `http://localhost:3000/api`
   - `authToken`: Your JWT token after login

**Collection Contents:**
- ✅ Authentication endpoints (register, login)
- ✅ Asset CRUD operations
- ✅ Pre-configured request examples
- ✅ Environment variables for easy testing
- ✅ Test scripts for automated validation

**Quick Test Workflow:**
1. Run `POST /auth/register` to create account
2. Run `POST /auth/login` to get JWT token
3. Token automatically saved to environment
4. Test protected endpoints with authentication

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
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,avalanche-2,polkadot&vs_currencies=usd&x_cg_demo_api_key=your_coingecko_api_key_here
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
   
   **MongoDB Collection Example:**
   ![Password Hashing in MongoDB](https://drive.google.com/uc?export=view&id=1mxgHcErNNZ_EDQb4zOAkQA71Vkf3z0hO)
   
   *Screenshot showing successful password hashing in MongoDB collection - passwords are stored as bcrypt hashes, never in plain text.*

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

## 📈 Scalability & Performance

### Current Architecture Scalability

The application is designed with scalability in mind using modern patterns:

#### Horizontal Scaling Strategies

**1. Microservices Architecture (Future Enhancement)**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │  Asset Service  │    │  Price Service  │
│   (Users/JWT)   │    │   (Portfolio)   │    │  (CoinGecko)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   API Gateway   │
                    │   (Load Balancer)│
                    └─────────────────┘
```

**Benefits:**
- Independent service scaling
- Technology diversity per service
- Fault isolation
- Team autonomy

**2. Database Scaling**

**Read Replicas:**
```javascript
// MongoDB replica set configuration
const mongoOptions = {
  readPreference: 'secondaryPreferred',
  replicaSet: 'cryptotrack-replica-set'
};
```

**Sharding Strategy:**
- Shard by user ID for user data
- Shard by asset ticker for price data
- Geographic sharding for global users

**3. Caching Implementation**

**Redis Caching Layer:**
```javascript
// Price caching example
const redis = require('redis');
const client = redis.createClient();

async function getCachedPrices() {
  const cached = await client.get('crypto-prices');
  if (cached) return JSON.parse(cached);
  
  const prices = await fetchFromCoinGecko();
  await client.setex('crypto-prices', 300, JSON.stringify(prices)); // 5min cache
  return prices;
}
```

**Application-Level Caching:**
- API response caching
- Database query result caching
- Static asset caching with CDN

#### Load Balancing Strategies

**1. Application Load Balancer**
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app1
      - app2
      - app3

  app1:
    build: .
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=app1

  app2:
    build: .
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=app2

  app3:
    build: .
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=app3
```

**2. Database Connection Pooling**
```javascript
// lib/db.js enhancement
const mongoose = require('mongoose');

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;
  
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10, // Maximum connections
    minPoolSize: 2,  // Minimum connections
    maxIdleTimeMS: 30000,
    serverSelectionTimeoutMS: 5000,
  });
};
```

#### Performance Optimizations

**1. API Response Optimization**
```javascript
// Pagination implementation
app.get('/api/assets', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const assets = await Asset.find({ owner: userId })
    .skip(skip)
    .limit(limit)
    .lean(); // Faster queries without Mongoose overhead

  res.json({
    assets,
    pagination: {
      page,
      limit,
      total: await Asset.countDocuments({ owner: userId })
    }
  });
});
```

**2. Database Indexing Strategy**
```javascript
// models/Asset.js
const assetSchema = new mongoose.Schema({
  ticker: { type: String, required: true, index: true },
  owner: { type: ObjectId, ref: 'User', required: true, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

// Compound indexes for common queries
assetSchema.index({ owner: 1, ticker: 1 });
assetSchema.index({ owner: 1, createdAt: -1 });
```

**3. Frontend Performance**
```javascript
// Next.js optimizations
module.exports = {
  // Image optimization
  images: {
    domains: ['api.coingecko.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Compression
  compress: true,
};
```

#### Monitoring & Observability

**1. Application Metrics**
```javascript
// Basic monitoring setup
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware to track metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});
```

**2. Health Checks**
```javascript
// pages/api/health.js
export default function handler(req, res) {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: 'connected', // Check MongoDB connection
      external_api: 'operational', // Check CoinGecko API
      memory: process.memoryUsage(),
    }
  };
  
  res.status(200).json(healthCheck);
}
```

#### Cloud Deployment Strategies

**1. Container Orchestration (Kubernetes)**
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cryptotrack-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cryptotrack
  template:
    metadata:
      labels:
        app: cryptotrack
    spec:
      containers:
      - name: cryptotrack
        image: vedteredesai/cryptotrack:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: cryptotrack-secrets
              key: mongodb-uri
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

**2. Auto-scaling Configuration**
```yaml
# k8s-hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: cryptotrack-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cryptotrack-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

#### Future Scalability Enhancements

**Short-term (3-6 months):**
- [ ] Implement Redis caching for API responses
- [ ] Add database read replicas
- [ ] Set up CDN for static assets
- [ ] Implement API rate limiting
- [ ] Add comprehensive logging with ELK stack

**Medium-term (6-12 months):**
- [ ] Migrate to microservices architecture
- [ ] Implement event-driven architecture with message queues
- [ ] Add real-time features with WebSocket clustering
- [ ] Implement advanced monitoring with Grafana/Prometheus
- [ ] Set up automated testing and CI/CD pipelines

**Long-term (12+ months):**
- [ ] Multi-region deployment
- [ ] Advanced ML-based auto-scaling
- [ ] Implement CQRS pattern for read/write separation
- [ ] Add blockchain integration for DeFi features
- [ ] Implement advanced security with zero-trust architecture

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

### Docker Deployment (Recommended for Production)

#### Prerequisites
- Docker and Docker Compose installed
- At least 2GB RAM available
- Port 3000 and 27017 available

#### Quick Start with Docker Hub

**Pull and run the pre-built image:**
```bash
# Pull from Docker Hub
docker pull vedteredesai/cryptotrack:latest

# Run the pulled image
docker run -p 3000:3000 vedteredesai/cryptotrack:latest
```

#### Quick Start with Docker Compose

1. **Clone and navigate to the project:**
```bash
git clone <your-repository-url>
cd cryptotrack
```

2. **Create environment file:**
```bash
cp .env.docker .env.local
# Edit .env.local with your actual values
```

3. **Build and start all services:**
```bash
# Start the application with MongoDB
docker-compose up -d

# Or with MongoDB Admin interface
docker-compose --profile admin up -d
```

4. **Access the application:**
- **CryptoTrack App**: http://localhost:3000
- **MongoDB Admin** (if enabled): http://localhost:8081
  - Username: `admin`
  - Password: `admin123`

#### Docker Commands

**Build the application:**
```bash
docker build -t cryptotrack .
```

**Run the container:**
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb://host.docker.internal:27017/cryptotrack" \
  -e JWT_SECRET="your_secret_key_here" \
  -e NEXT_PUBLIC_CRPYTOGETO="your_coingecko_api_key" \
  cryptotrack
```

**View logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f cryptotrack
```

**Stop services:**
```bash
docker-compose down

# Remove volumes (WARNING: This deletes all data)
docker-compose down -v
```

#### Production Docker Setup

For production deployment, create a `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  cryptotrack:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - NEXT_PUBLIC_CRPYTOGETO=${NEXT_PUBLIC_CRPYTOGETO}
    restart: always
    depends_on:
      - mongo

  mongo:
    image: mongo:7.0
    volumes:
      - mongo_data:/data/db
    restart: always
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}

volumes:
  mongo_data:
```

#### Docker Features

- **Multi-stage build** for optimized image size
- **Non-root user** for security
- **Standalone output** for minimal runtime dependencies
- **Health checks** and automatic restarts
- **Volume persistence** for MongoDB data
- **Network isolation** between services

---

### Vercel Deployment

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
