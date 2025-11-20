// MongoDB initialization script for Docker
// This script runs when the MongoDB container starts for the first time

// Switch to the cryptotrack database
db = db.getSiblingDB('cryptotrack');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'password', 'role'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'Username must be a string and is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
          description: 'Email must be a valid email address and is required'
        },
        password: {
          bsonType: 'string',
          minLength: 6,
          description: 'Password must be a string with minimum 6 characters and is required'
        },
        role: {
          bsonType: 'string',
          enum: ['user', 'admin'],
          description: 'Role must be either user or admin and is required'
        }
      }
    }
  }
});

db.createCollection('assets', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['ticker', 'name', 'targetPrice', 'quantity', 'buyPrice', 'owner'],
      properties: {
        ticker: {
          bsonType: 'string',
          description: 'Ticker must be a string and is required'
        },
        name: {
          bsonType: 'string',
          description: 'Name must be a string and is required'
        },
        targetPrice: {
          bsonType: 'number',
          minimum: 0,
          description: 'Target price must be a positive number and is required'
        },
        quantity: {
          bsonType: 'number',
          minimum: 0,
          description: 'Quantity must be a positive number and is required'
        },
        buyPrice: {
          bsonType: 'number',
          minimum: 0,
          description: 'Buy price must be a positive number and is required'
        },
        owner: {
          bsonType: 'objectId',
          description: 'Owner must be a valid ObjectId and is required'
        }
      }
    }
  }
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 });
db.users.createIndex({ role: 1 });

db.assets.createIndex({ owner: 1 });
db.assets.createIndex({ ticker: 1 });
db.assets.createIndex({ createdAt: -1 });

// Create a default admin user (password: admin123)
// Note: In production, this should be done securely
db.users.insertOne({
  username: 'admin',
  email: 'admin@cryptotrack.com',
  password: '$2a$10$rOzJqKZqKZqKZqKZqKZqKOzJqKZqKZqKZqKZqKZqKZqKZqKZqKZqK', // This should be the actual bcrypt hash
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
});

print('CryptoTrack database initialized successfully!');
print('Collections created: users, assets');
print('Indexes created for performance optimization');
print('Default admin user created: admin@cryptotrack.com');