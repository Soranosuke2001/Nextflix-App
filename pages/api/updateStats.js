import jwt from 'jsonwebtoken';

const updateState = async (req, res) => {
    if (req.method === 'POST') {
        try {
            if (req.cookies.token) {
                const tokenDecoded = jwt.verify(req.cookies.token, process.env.HASURA_JWT_SECRET_KEY);
                res.json({ message: 'working', tokenDecoded });
            } else {
                res.status(403).json({ message: 'You do not have the correct permissions' });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error updating the database', error});
        };  
    };
};

export default updateState;

