import jwt from 'jsonwebtoken';

export default function JwtSignToken(issuer: string) {
  const token = jwt.sign(
    {
      issuer,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'admin'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': `${issuer}`,
      },
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '7d',
    },
  );

  return token;
}
