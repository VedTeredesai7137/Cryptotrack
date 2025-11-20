import { dbConnect } from '../../../../lib/db';
import { verifyToken } from '../../../../lib/auth';
import Asset from '../../../../models/Asset';

export default async function handler(req, res) {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!['DELETE', 'PUT'].includes(req.method)) {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    await dbConnect();

    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // RBAC: Only asset owners can modify their own assets
    const isOwner = asset.owner.toString() === decoded.sub;
    if (!isOwner) {
      return res.status(403).json({ error: 'Forbidden: You can only modify your own assets' });
    }

    if (req.method === 'DELETE') {
      await asset.deleteOne();
      return res.status(200).json({ message: 'Asset deleted' });
    }

    if (req.method === 'PUT') {
      const { ticker, name, targetPrice, quantity, buyPrice } = req.body;

      // Validation
      if (!ticker || !name || targetPrice == null || quantity == null || buyPrice == null) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (targetPrice <= 0 || quantity <= 0 || buyPrice <= 0) {
        return res.status(400).json({ error: 'Prices and quantity must be positive' });
      }

      // Update the asset
      asset.ticker = ticker.toUpperCase();
      asset.name = name;
      asset.targetPrice = Number(targetPrice);
      asset.quantity = Number(quantity);
      asset.buyPrice = Number(buyPrice);

      const updatedAsset = await asset.save();
      return res.status(200).json({ asset: updatedAsset });
    }
  } catch (error) {
    console.error('Asset operation error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

