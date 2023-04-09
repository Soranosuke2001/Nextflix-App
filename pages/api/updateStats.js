import { fetchVideoStats } from '@/lib/db/hasura';
import jwt from 'jsonwebtoken';

const updateState = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const jwtToken = req.cookies.token;
            if (jwtToken) {
                const tokenDecoded = jwt.verify(jwtToken, process.env.HASURA_JWT_SECRET_KEY);

                const userId = tokenDecoded.issuer;
                const videoId = req.query.videoId;

                const response = await fetchVideoStats(userId, videoId, jwtToken);
                console.log(tokenDecoded)
                res.json({ message: 'working', response });
            } else {
                res.status(403).json({ message: 'You do not have the correct permissions' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error updating the database', error});
        };  
    };
};

export default updateState;

