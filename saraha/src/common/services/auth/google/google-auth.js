import {OAuth2Client}  from 'google-auth-library'
import {google_audience_key} from "../../../../config/config.js";

const client = new OAuth2Client();

export async function  verifyIdToken(IdToken){
     const ticket =  await client.verifyIdToken({
        idToken: IdToken,
        audience: google_audience_key
    });
   return ticket.getPayload();
}


