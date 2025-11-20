import { verifyToken } from './auth';

export const requireAdmin = (req) => {
  const decoded = verifyToken(req);
  
  if (!decoded) {
    return null;
  }
  
  if (decoded.role !== 'admin') {
    return null;
  }
  
  return decoded;
};

