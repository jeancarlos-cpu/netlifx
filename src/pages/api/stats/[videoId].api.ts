/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next';

import { initializeClient } from 'lib/urql-client';
import { verifyJwt } from 'lib/verify-jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error();
    }

    const videoId = String(req.query.videoId);
    const userId = verifyJwt(token);

    switch (req.method) {
      case 'GET':
        {
          const stats = await findOne(videoId);
          if (!stats) {
            throw new Error();
          }
          res.status(200).json(stats);
        }
        break;
      case 'POST':
        {
          const { favourited } = req.body;
          const hasStatus = await findOne(videoId);
          if (hasStatus) {
            const stats = await update({
              id: hasStatus.id,
              favourited,
            });
            res.status(200).json(stats);
          } else {
            const stats = await create({
              videoId,
              userId,
              favourited,
            });
            res.status(200).json(stats);
          }
        }
        break;

      default:
        break;
    }
  } catch (e) {
    res.status(404).send('Unable to fetch video stats.');
  }
}

type Stats = {
  id: number;
  favourited: boolean;
  userId: string;
  videoId: string;
  watched: boolean;
};

async function findOne(videoId: string) {
  const client = initializeClient();
  const { data } = await client
    .query<{ stats: Stats[] }>(QUERY_VIDEO_STATS, { videoId })
    .toPromise();
  const stats = data?.stats[0];

  if (!stats) {
    return null;
  }

  return stats;
}

async function create({
  videoId,
  userId,
  favourited,
  watched = true,
}: Partial<Stats>) {
  const client = initializeClient();
  const { data } = await client
    .mutation<{ stats: Stats }>(CREATE_STATS, {
      input: { videoId, userId, favourited, watched },
    })
    .toPromise();

  const stats = data?.stats;

  if (!stats) {
    throw new Error();
  }

  return stats;
}

async function update({ favourited, id }: Partial<Stats>) {
  const client = initializeClient();
  const { data } = await client
    .mutation<{ update_stats_by_pk: Stats }>(UPDATE_STATS, {
      input: { favourited },
      where: { id },
    })
    .toPromise();

  const stats = data?.update_stats_by_pk;

  if (!stats) {
    throw new Error();
  }

  return stats;
}

const UPDATE_STATS = `
mutation($input: stats_set_input!, $where: stats_pk_columns_input!) {
  update_stats_by_pk(_set: $input, pk_columns: $where) {
    id
    favourited
    watched
    userId
    videoId
  }
}
`;

const QUERY_VIDEO_STATS = `
query queryVideoStats ($videoId: String!) {
  stats(where: {videoId: {_eq: $videoId}}) {
    id
    favourited
    userId
    videoId
    watched
  }
}`;

const CREATE_STATS = `
mutation ($input: stats_insert_input!) {
  insert_stats_one (object: $input) {
    id
    favourited
    userId
    videoId
    watched
  }
}
`;
