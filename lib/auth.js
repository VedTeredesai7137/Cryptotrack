import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return process.env.JWT_SECRET;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

export const generateToken = (userId, role) =>
  jwt.sign({ sub: userId, role }, getJwtSecret(), { expiresIn: '7d' });

export const verifyToken = (req) => {
  const authorization =
    req?.headers?.authorization || req?.headers?.Authorization || '';

  if (!authorization.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    return null;
  }
};

