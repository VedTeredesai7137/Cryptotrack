/**
 * Standalone script to create an admin user
 * Usage: npm run create-admin
 * 
 * This script will:
 * 1. Connect to MongoDB
 * 2. Hash the password 'admin123'
 * 3. Create a user with role 'admin'
 */

import { dbConnect } from '../lib/db.js';
import { hashPassword } from '../lib/auth.js';
import User from '../models/User.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables manually (since we're using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envPath = join(__dirname, '..', '.env.local');
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach((line) => {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length) {
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    }
  });
  console.log('✅ Loaded environment variables from .env.local');
} catch (error) {
  console.warn('⚠️  Could not load .env.local file. Make sure environment variables are set.');
  console.warn('   Required: MONGODB_URI, JWT_SECRET');
}

const DEFAULT_ADMIN = {
  username: 'admin',
  email: 'admin@cryptotrack.com',
  password: 'admin123',
  role: 'admin',
};

async function createAdmin() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', DEFAULT_ADMIN.email);
      console.log('   To create a new admin, use a different email.');
      process.exit(0);
    }

    console.log('🔐 Hashing password...');
    const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

    console.log('👤 Creating admin user...');
    const admin = await User.create({
      username: DEFAULT_ADMIN.username,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      role: DEFAULT_ADMIN.role,
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('   Email:', admin.email);
    console.log('   Password:', DEFAULT_ADMIN.password);
    console.log('   Role:', admin.role);
    console.log('   ID:', admin._id);
    console.log('\n⚠️  Please change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the script
createAdmin();

