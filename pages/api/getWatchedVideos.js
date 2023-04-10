import { fetchWatchedVideos } from "@/lib/db/hasura";
import jwt from 'jsonwebtoken';

const getWatchedVideos = async (req, res) => {
  if (req.method === "GET") {
    const jwtToken = req.cookies.token;
    const tokenDecoded = jwt.verify(
      jwtToken,
      process.env.HASURA_JWT_SECRET_KEY
    );

    const userId = tokenDecoded.issuer;

    const videosList = await fetchWatchedVideos(userId, jwtToken);
    res.json({ message: videosList });
  }
};

export default getWatchedVideos;
