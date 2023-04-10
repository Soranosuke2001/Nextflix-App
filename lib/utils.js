import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

export const verifyToken = async (jwtToken) => {
  try {
    if (jwtToken) {
      const verified = await jwtVerify(
        jwtToken,
        new TextEncoder().encode(process.env.HASURA_JWT_SECRET_KEY));
      return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    console.error({ err });
    return null;
  }
};
