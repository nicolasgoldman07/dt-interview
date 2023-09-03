export default async (payload: unknown = undefined) => {
  const url = '';
  const username = '';
  const password = '';

  const requestBody = {
    tenant_id: 'xxx00000',
    app_id: 'APPLICATION-XXXXXXXXXXXXX',
    dates: '1900-01-01_1900-01-31'
  };

  const headers = new Headers({
    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
    'Content-Type': 'application/json'
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
}


