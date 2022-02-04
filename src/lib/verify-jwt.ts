import jwt from 'jsonwebtoken';

export function verifyJwt(token: string) {
  if (!token) {
    return;
  }

  const decoded: any = jwt.verify(
    String(token),
    String(process.env.JWT_SECRET),
  );

  const issuer = decoded?.issuer;
  return String(issuer);
}
