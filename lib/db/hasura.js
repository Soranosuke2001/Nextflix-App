export async function checkUser(jwtToken) {
  const operationsDoc = `
    query MyQuery {
        users (where: {issuer: {_eq:
        "did:ethr:0x75219f3520067B262A993A4365a6555CA9388149"}})
        {
          id
          email
          issuer
        }
    }
  `;

  const response = await queryHasura(operationsDoc, "MyQuery", {}, jwtToken);
  return response?.data?.users?.length === 0;
}

async function queryHasura(operationsDoc, operationName, variables, jwtToken) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`,
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

const operationsDoc = `
    query MyQuery {
        users (where: {issuer: {_eq:
        "did:ethr:0x75219f3520067B262A993A4365a6555CA9388149"}})
        {
          id
          email
          issuer
        }
    }
`;

function fetchMyQuery() {
  return queryHasura(
    operationsDoc,
    "MyQuery",
    {},
    process.env.NEXT_PUBLIC_JWT_TOKEN
  );
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}
