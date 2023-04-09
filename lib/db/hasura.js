async function queryHasura(operationsDoc, operationName, variables) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNvcmEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY4MTY2MDU1NiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIiwidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6InNvcmEifX0.K2HG6YGksWxEdkA-t_1ruqx5ay8w_fJnD4pB8f1kxMk"
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
  return queryHasura(operationsDoc, "MyQuery", {});
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
