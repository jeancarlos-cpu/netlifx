import { NextApiRequest, NextApiResponse } from 'next';
import { initializeClient } from '../../../lib/urql-client';
import { verifyJwt } from '../../../lib/verify-jwt';

const QUERY_WATCHED_VIDEOS = `
query watchedVideos($userId: String!) {
  stats(where: {
    watched: {_eq: true},
    userId: {_eq: $userId},
  }) {
    videoId
  }
}
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = initializeClient();
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error();
    }

    const userId = verifyJwt(token);

    const { data } = await client
      .query(QUERY_WATCHED_VIDEOS, { userId })
      .toPromise();
    res.status(200).json(data.stats);
  } catch {
    return res.status(404).send('could not find watched videos');
  }
}
