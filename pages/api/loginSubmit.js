import { mAdmin } from "@/lib/magic-server";
import jwt from "jsonwebtoken";
import { checkUser, createUser } from "@/lib/db/hasura";
import { saveToken } from "@/lib/cookies";

// const testing = (jwtPayload) => {
//     return jwt.sign(jwtPayload, process.env.HASURA_JWT_SECRET_KEY)
// };

export const Login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const authHeader = req.headers.authorization;
      const didToken = authHeader ? authHeader.substr(7) : "";

      const mMetadata = await mAdmin.users.getMetadataByToken(didToken);

      const jwtPayload = {
        ...mMetadata,
        iat: Math.floor(Date.now() / 1000),
        // The token will expire in 7 days
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["admin", "user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${mMetadata.issuer}`,
        },
      };

      const jwtToken = jwt.sign(jwtPayload, process.env.HASURA_JWT_SECRET_KEY);

      // returns True if new user
      // returns False if user exits
      console.log({ jwtToken });
      const checkUserQuery = await checkUser(jwtToken, mMetadata.issuer);

      if (checkUserQuery) {
        const registerUser = await createUser(jwtToken, mMetadata);
        const jwtCookie = saveToken(jwtToken, res);

        console.log(jwtCookie);


        res.send({ message: "user is new", registerUser });
      } else {
        const jwtCookie = saveToken(jwtToken, res);

        console.log(jwtCookie);

        res.send({ message: "user exists" });
      }
      //   res.json({ message: checkUserQuery });
    } catch (error) {
      res.status(500).json({ message: "there was an error", error });
    }
  } else {
    res.status(400).send({ message: "The request must be a POST method" });
  }
};

export default Login;
