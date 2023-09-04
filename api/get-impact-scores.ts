/* eslint-disable no-secrets/no-secrets */
import {
  credentialVaultClient,
} from "@dynatrace-sdk/client-classic-environment-v2";

export default async (payload: unknown = undefined) => {
  const [urlToken] = await getToken("CREDENTIALS_VAULT-9A78B088AC46D929", ["token"]);
  const url = `${urlToken}get_impact_scores/run`

  const [username, password] = await getToken("CREDENTIALS_VAULT-6828AECD951D54A2", ["username", "password"]);

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

const getToken = async (vaultId: string, lookupTokens: string[]) => {
  const data = await credentialVaultClient.getCredentialsDetails({
    id: vaultId,
  });
  const credentials = lookupTokens.map((token) => (data as any)[token]);
  return credentials;
};