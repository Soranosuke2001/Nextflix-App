import { fetchVideoStats } from '@/lib/db/hasura';
import jwt from 'jsonwebtoken';

const updateState = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const jwtToken = req.cookies.token;
            if (jwtToken) {
                const tokenDecoded = jwt.verify(jwtToken, process.env.HASURA_JWT_SECRET_KEY);

                const userId = "did:ethr:0x75219f3520067B262A993A4365a6555CA9388149";
                const videoId = "1_wHgvZyZdk";

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

