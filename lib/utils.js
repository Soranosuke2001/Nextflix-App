import jwt from 'jsonwebtoken';

export const verifyToken = async (jwtToken) => {
    if (jwtToken) {
        const tokenDecoded = jwt.verify(jwtToken, process.env.HASURA_JWT_SECRET_KEY);
        const userId = tokenDecoded ? tokenDecoded.issuer : null;        
        return userId;        
    }
};
