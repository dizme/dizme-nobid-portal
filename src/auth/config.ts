import { NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt, { JwtPayload } from "jsonwebtoken";

// Your authOptions definition here
export const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
          clientId: process.env.KEYCLOAK_CLIENT_ID,
          clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
          issuer: process.env.KEYCLOAK_ISSUER
        })
      ],
      session: {
        maxAge: 60 * 30
      },
      callbacks: {
        async jwt({ token, account }) {
          if (account) {
            token.idToken = account.id_token
            token.accessToken = account.access_token
            token.refreshToken = account.refresh_token
            token.expiresAt = account.expires_at
          }
          if (Date.now() < (token.expiresAt! * 1000 - 60 * 1000)) {
            return token
          } else {
            try {
              const response = await requestRefreshOfAccessToken(token)
    
              const tokens: TokenSet = await response.json()
    
              if (!response.ok) throw tokens
    
              const updatedToken: JWT = {
                ...token, // Keep the previous token properties
                idToken: tokens.id_token,
                accessToken: tokens.access_token,
                expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                refreshToken: tokens.refresh_token ?? token.refreshToken,
              }
              return updatedToken
            } catch (error) {
              console.error("Error refreshing access token", error)
              return { ...token, error: "RefreshAccessTokenError" }
            }
          }
        },
        async session({ session, token }) {
          // get claim from id token
          const idToken = token.idToken
          // decode id token
          const decoded = jwt.decode(idToken as string);
          // console.log("decodedToken", decoded);
          if (decoded && typeof decoded === 'object') {
            const pidIdTokenDecoded = decoded as PIDJwtPayload;
            if (pidIdTokenDecoded.nationality) {
              session.user.nationality = pidIdTokenDecoded.nationality;
            }
            if (typeof pidIdTokenDecoded.ageOver18 !== 'undefined') {
              session.user.over18 = pidIdTokenDecoded.ageOver18;
            }
          }    
          return session
        }
      }
};

function requestRefreshOfAccessToken(token: JWT) {
  // Correctly format the body by directly passing an object to URLSearchParams
  const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
  });

  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      method: "POST",
      cache: "no-store"
  });
}


interface PIDJwtPayload extends JwtPayload {
  nationality?: string;
  ageOver18?: boolean;
}
