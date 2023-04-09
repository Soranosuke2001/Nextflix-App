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
    // jwtToken
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDc1MjE5ZjM1MjAwNjdCMjYyQTk5M0E0MzY1YTY1NTVDQTkzODgxNDkiLCJwdWJsaWNBZGRyZXNzIjoiMHg3NTIxOWYzNTIwMDY3QjI2MkE5OTNBNDM2NWE2NTU1Q0E5Mzg4MTQ5IiwiZW1haWwiOiJzb3Jhem9yYTEuNEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwid2FsbGV0cyI6W10sImlhdCI6MTY4MTA3MTA1OSwiZXhwIjoxNjgxNjc1ODU5LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHg3NTIxOWYzNTIwMDY3QjI2MkE5OTNBNDM2NWE2NTU1Q0E5Mzg4MTQ5In19.JwA70QiCWKDfwjqF-Dykg50klkw067bSGL5h_EkRfkM'
  );

  console.log(response.data)
  return response?.data?.users?.length === 0;
}

export async function createUser(jwtToken, mMetadata) {
  const operationsDoc = `
  mutation registerUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      affected_rows
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = mMetadata;

  const response = await queryHasura(
    operationsDoc,
    "registerUser",
    { issuer, email, publicAddress },
    jwtToken
  );

  return response;
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
