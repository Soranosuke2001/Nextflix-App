import { verifyToken } from "@/lib/utils";

export const UseRedirectUser = async (context) => {
  const jwtToken = context.req ? context.req?.cookies.token : null;
  const userId = await verifyToken(jwtToken);

  console.log({ userId });

  return { userId, jwtToken };
};

export default UseRedirectUser;
