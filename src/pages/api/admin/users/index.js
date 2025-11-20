import { dbConnect } from '../../../../../lib/db';
import { requireAdmin } from '../../../../../lib/admin';
import User from '../../../../../models/User';

export default async function handler(req, res) {
  // Verify admin authentication
  const decoded = requireAdmin(req);
  if (!decoded) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await dbConnect();

    // Fetch all users, excluding password field
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    return res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

