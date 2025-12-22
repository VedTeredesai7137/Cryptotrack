
export default async function handler(req, res) {
    const { ids, include_24hr_change } = req.query;
    const apiKey = process.env.CrpytoGeto;

    if (!ids) {
        return res.status(400).json({ error: 'Missing ids parameter' });
    }

    try {
        let url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

        if (include_24hr_change === 'true') {
            url += '&include_24hr_change=true';
        }

        if (apiKey) {
            const apiKeyParam = apiKey.startsWith('CG-')
                ? `x_cg_demo_api_key=${apiKey}`
                : `x_cg_pro_api_key=${apiKey}`;
            url += `&${apiKeyParam}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            // Forward the status code from CoinGecko or default to 500
            return res.status(response.status).json({ error: 'Failed to fetch prices from provider' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Price proxy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
