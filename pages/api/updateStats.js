import { fetchVideoStats, insertStats, updateStats } from "@/lib/db/hasura";
import jwt from "jsonwebtoken";

const updateState = async (req, res) => {
  if (req.method === "POST") {
    try {
      const jwtToken = req.cookies.get("token");
      if (jwtToken) {
        const tokenDecoded = jwt.verify(
          jwtToken,
          process.env.HASURA_JWT_SECRET_KEY
        );

        const userId = tokenDecoded.issuer;

        const { watched = true, favourited, videoId } = req.body;

        if (videoId) {
          // returns true if the video exists in the stats table
          const response = await fetchVideoStats(userId, videoId, jwtToken);

          const checkStatsQuery = response?.length !== 0;

          if (checkStatsQuery) {
            const response = await updateStats(
              { userId, videoId, watched, favourited },
              jwtToken
            );
            res.json({ message: "working", response: checkStatsQuery });
          } else {
            const response = await insertStats(
              { userId, videoId, watched, favourited },
              jwtToken
            );
            res.json({ message: "working", response: checkStatsQuery });
          }
        } else {
          res
            .status(403)
            .json({ message: "You do not have the correct permissions" });
        }
      } else {
        res.status(400).json({ message: "Video ID was missing" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating the database", error });
    }
  } else if (req.method === "GET") {
    try {
      const jwtToken = req.cookies.get("token");
      if (jwtToken) {
        const tokenDecoded = jwt.verify(
          jwtToken,
          process.env.HASURA_JWT_SECRET_KEY
        );

        const userId = tokenDecoded.issuer;
        const videoId = req.query.videoId;

        const checkStatsQuery = await fetchVideoStats(
          userId,
          videoId,
          jwtToken
        );

        const favourited = checkStatsQuery[0].favourited;
        res.json({ favourited });
      } else {
        res.status(400).json({ message: "Invalid DID Token" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching data from stats table " });
    }
  }
};

export default updateState;
