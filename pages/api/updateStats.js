import { fetchVideoStats, insertStats, updateStats } from '@/lib/db/hasura';
import jwt from 'jsonwebtoken';

const updateState = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const jwtToken = req.cookies.token;
            if (jwtToken) {
                const tokenDecoded = jwt.verify(jwtToken, process.env.HASURA_JWT_SECRET_KEY);

                const userId = tokenDecoded.issuer;
                const videoId = req.query.videoId;

                const { watched, favourited } = req.body;

                // returns true if the video exists in the stats table
                const checkStatsQuery = await fetchVideoStats(userId, videoId, jwtToken);

                if (checkStatsQuery) {
                    const response = await updateStats({ userId, videoId: "63bUBEIhpNk", watched, favourited }, jwtToken);
                    res.json({ message: 'working', response: checkStatsQuery });
                } else {
                    const response = await insertStats({ userId, videoId: "63bUBEIhpNk", watched, favourited }, jwtToken)
                    res.json({ message: 'working', response: checkStatsQuery });
                }
            } else {
                res.status(403).json({ message: 'You do not have the correct permissions' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error updating the database', error});
        };  
    };
};

export default updateState;

