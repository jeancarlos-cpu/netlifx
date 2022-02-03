import jwt from 'jsonwebtoken';

export default function JwtSignToken(issuer: string) {
  const sevenDaysInSeconds = 7 * 24 * 60 * 60;

  const token = jwt.sign(
    {
      payload: {
        issuer,
        'x-hasura-allowed-roles': ['user', 'admin'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': `${issuer}`,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + sevenDaysInSeconds),
      },
    },
    String(process.env.JWT_SECRET),
  );

  return token;
}
