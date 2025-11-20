import { dbConnect } from '../../../../lib/db';
import { verifyToken } from '../../../../lib/auth';
import Asset from '../../../../models/Asset';
import User from '../../../../models/User';

export default async function handler(req, res) {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await dbConnect();

    if (req.method === 'POST') {
      const { ticker, name, targetPrice, quantity, buyPrice } = req.body || {};

      const numericFieldsValid =
        typeof targetPrice === 'number' &&
        typeof quantity === 'number' &&
        typeof buyPrice === 'number' &&
        targetPrice >= 0 &&
        quantity >= 0 &&
        buyPrice >= 0;

      if (!ticker || !name || !numericFieldsValid) {
        return res
          .status(400)
          .json({ error: 'ticker, name, targetPrice, quantity, and buyPrice are required' });
      }

      const asset = await Asset.create({
        ticker,
        name,
        targetPrice,
        quantity,
        buyPrice,
        owner: decoded.sub,
      });

      return res.status(201).json({ asset });
    }

    if (req.method === 'GET') {
      // RBAC: Admin sees all assets, User sees only their own
      const query = decoded.role === 'admin' ? {} : { owner: decoded.sub };
      
      // For admin: Populate owner field to show username
      // For user: No need to populate (they know it's theirs)
      const assets = decoded.role === 'admin'
        ? await Asset.find(query).populate('owner', 'username email').sort({ createdAt: -1 })
        : await Asset.find(query).sort({ createdAt: -1 });

      // Format response for admin (include owner info) vs user (keep as is)
      const formattedAssets = decoded.role === 'admin'
        ? assets.map((asset) => {
            const assetObj = asset.toObject();
            // Handle case where owner might be null (deleted user)
            if (asset.owner && typeof asset.owner === 'object') {
              assetObj.owner = {
                id: asset.owner._id || asset.owner.id,
                username: asset.owner.username || 'Unknown',
                email: asset.owner.email || 'N/A',
              };
            } else {
              assetObj.owner = {
                id: assetObj.owner,
                username: 'Deleted User',
                email: 'N/A',
              };
            }
            return assetObj;
          })
        : assets;

      return res.status(200).json({ assets: formattedAssets });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Assets index error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

