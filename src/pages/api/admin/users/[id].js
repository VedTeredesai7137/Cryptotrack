import { dbConnect } from '../../../../../lib/db';
import { requireAdmin } from '../../../../../lib/admin';
import User from '../../../../../models/User';

export default async function handler(req, res) {
  // Verify admin authentication
  const decoded = requireAdmin(req);
  if (!decoded) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await dbConnect();

    // DELETE: Delete user by ID
    if (req.method === 'DELETE') {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Prevent admin from deleting themselves
      if (user._id.toString() === decoded.sub) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }

      await User.findByIdAndDelete(id);

      return res.status(200).json({ message: 'User deleted successfully' });
    }

    // PUT: Update user role
    if (req.method === 'PUT') {
      const { role } = req.body || {};

      if (!role || !['user', 'admin'].includes(role)) {
        return res.status(400).json({ error: 'Valid role (user or admin) is required' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Prevent admin from demoting themselves
      if (user._id.toString() === decoded.sub && role === 'user') {
        return res.status(400).json({ error: 'Cannot demote your own account' });
      }

      user.role = role;
      await user.save();

      return res.status(200).json({
        message: 'User role updated successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Method not allowed
    res.setHeader('Allow', ['DELETE', 'PUT']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Admin user operation error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

