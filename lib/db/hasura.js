/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://peaceful-collie-54.hasura.app/v1/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-hasura-admin-secret": "WwNfrlgVHz52BysfSv64wmNObvf1EO1HeoKffDZ2E2VAAt4Ke4MB8FCv3QZuj1Yx",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}

const operationsDoc = `
    query MyQuery {
        users {
        email
        id
        issuer
        publicAddress
        }
    }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
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
