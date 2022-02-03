import type { NextApiRequest, NextApiResponse } from 'next';
import { Magic } from '@magic-sdk/admin';
import { setCookie } from 'nookies';
import { initializeClient } from '../../lib/urql-client';
import JwtSignToken from '../../lib/jwt-sign-token';

const CREATE_USER = `
mutation ($input: users_insert_input!) {
  insert_users_one (object: $input) {
    id
    email
    issuer
  }
}
`;

const QUERY_USER_BY_PK = `
query ($issuer: String!) {
  users_by_pk(issuer: $issuer) {
    issuer
  }
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    const { didToken } = req.body;
    if (!didToken) {
      return res.status(404).send('Invalid credentials');
    }

    const magicAdmin = new Magic(process.env.MAGIC_SECRET_KEY);
    const { issuer, email } = await magicAdmin.users.getMetadataByToken(
      didToken,
    );
    if (!issuer) {
      return res.status(404).send('Invalid credentials');
    }

    const client = initializeClient();
    const { data } = await client
      .query(QUERY_USER_BY_PK, { issuer })
      .toPromise();

    if (!data.issuer) {
      await client
        .mutation(CREATE_USER, { input: { issuer, email } })
        .toPromise();
    }

    const token = JwtSignToken(issuer);

    setCookie({ res }, 'token', token, {
      maxAge: sevenDaysInSeconds,
      expires: new Date(Date.now() + sevenDaysInSeconds * 1000),
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    res.status(200).send('ok');
  } catch {
    res.status(500).send('Internal server error');
  }
}
