import { jwtVerify } from "jose";

export async function verifyToken(jwtToken) {
  // console.log(jwtToken)
  try {
    if (jwtToken) {
      const verified = await jwtVerify(
        jwtToken.value,
        new TextEncoder().encode(process.env.HASURA_JWT_SECRET_KEY)
      );

      console.log(verified)
        return verified.payload.issuer;
      // return verified.payload && verified.payload?.issuer;
    }
    return null;
  } catch (err) {
    // console.log('error is running')
    // console.log(typeof(process.env.HASURA_JWT_SECRET_KEY));
    console.error({ err });
    return null;
  }
};
