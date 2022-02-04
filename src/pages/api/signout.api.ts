import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';
import { magicAdmin } from '../../lib/magic';
import { verifyJwt } from '../../lib/verify-jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error();
    }

    const issuer = verifyJwt(token);
    if (!issuer) {
      throw new Error();
    }

    await magicAdmin.users.logoutByIssuer(issuer);
    destroyCookie({ res }, 'token', { maxAge: -1, path: '/' });
    destroyCookie({ res }, 'user.email', { maxAge: -1, path: '/' });
    res.writeHead(302, { Location: '/login' });
    res.end();
  } catch (e) {
    return res.status(401).send('Unable to logout.');
  }
}
