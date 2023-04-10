const { removeToken } = require("@/lib/cookies");
const { mAdmin } = require("@/lib/magic-server");
const { verifyToken } = require("@/lib/utils");

const logoutSubmit = async (req, res) => {
  if (req.method !== "POST") {
    try {
      const jwtToken = req.cookies.get("token");
      if (!jwtToken) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      const userId = await verifyToken(jwtToken);
      removeToken(jwtToken);

      try {
        await mAdmin.users.logoutByIssuer(userId);
      } catch (error) {
        console.log("There was an error when logging the user out: ", error);
      }

      res.writeHead(302, { Location: "/login" });
      res.end();
    } catch (error) {
      console.log("There was an error when logging the user out: ", error);
      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
