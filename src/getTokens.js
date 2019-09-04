import { encode as btoa } from 'base-64';
import {SpotyfiCredentials} from "../secret"
import {getAuthorizationCode} from "./getAuthCode"

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credentials = SpotyfiCredentials //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = btoa(`${credentials.clientID}:${credentials.secret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
      }`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData('accessToken', accessToken);
    await setUserData('refreshToken', refreshToken);
    await setUserData('expirationTime', expirationTime);
  } catch (err) {
    console.error(err);
  }
}