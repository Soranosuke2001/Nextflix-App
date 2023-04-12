import { verifyToken } from "@/lib/utils";

export const UseRedirectUser = async (context) => {
  const jwtToken = context.req ? context.req?.cookies.token : null;
  const userId = await verifyToken(jwtToken);

  console.log({userId})

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { userId, jwtToken };
};

export default UseRedirectUser;
