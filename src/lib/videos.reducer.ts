import fetchVideos from './fetchVideos';

const Types = {
  BY_ID: 'BY_ID',
  BY_QUERY: 'BY_QUERY',
  POPULAR_VIDEOS: 'POPULAR_VIDEOS',
};

type Action = {
  type: keyof typeof Types;
  payload?: string;
};

async function reducer(action: Action) {
  switch (action.type) {
    case Types.BY_ID:
      return (
        await fetchVideos(
          `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${action.payload}`,
        )
      )[0];
    case Types.BY_QUERY:
      return fetchVideos(`search?part=snippet&q=${action.payload}}`);
    case Types.POPULAR_VIDEOS:
      return fetchVideos(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`,
      );
    default:
      break;
  }
}

export function fetchById(id: string) {
  return reducer({
    type: 'BY_ID',
    payload: id,
  });
}

export function fetchByQuery(query: string) {
  return reducer({
    type: 'BY_QUERY',
    payload: query,
  });
}

export function fetchPopular() {
  return reducer({
    type: 'POPULAR_VIDEOS',
  });
}
