export async function checkUser(jwtToken, issuer) {
  const operationsDoc = `
    query checkUser($issuer: String!) {
        users (where: {issuer: {_eq: $issuer }})
        {
          id
          email
          issuer
        }
    }
  `;

  const response = await queryHasura(
    operationsDoc,
    "checkUser",
    { issuer },
    jwtToken
  );

  return response?.data?.users?.length === 0;
}

async function queryHasura(operationsDoc, operationName, variables, jwtToken) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
