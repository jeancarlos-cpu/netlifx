import { Heading, HStack, Text, VStack, chakra } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FC, useEffect, useLayoutEffect, useReducer } from 'react';
import {
  fetchById,
  fetchByQuery,
  fetchPopular,
} from '../../lib/videos.reducer';
import api from '../../services/api';
import formatDateDistance from '../../utils/formatDateDistance';
import formatNumber from '../../utils/formatNumber';
import type serializeVideosData from '../../utils/serializeVideosData';
import StatusButton from './components/statusButton';

type Props = {
  video: ReturnType<typeof serializeVideosData>[number];
};

type Action = {
  type: 'LIKE' | 'DISLIKE' | 'LOADED';
};

type StatusState = {
  like: boolean;
  dislike: boolean;
  isLoading: boolean;
};

const initialState: StatusState = {
  isLoading: true,
  like: false,
  dislike: false,
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'LOADED':
      return {
        ...state,
        isLoading: false,
      };
    case 'LIKE':
      return {
        ...state,
        like: !state.like,
        dislike: false,
      };
    case 'DISLIKE':
      return {
        ...state,
        like: false,
        dislike: !state.dislike,
      };
    default:
      return state;
  }
}

const VideoPage: FC<Props> = ({ video }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function asyncDispatchMiddleware(dispatch: Function) {
    return async function (action: Action) {
      switch (action.type) {
        case 'LIKE': {
          const favourited = !state?.like ? true : null;
          dispatch(action);
          await api.post(`/stats/${video.id}`, { favourited: favourited });
          return;
        }
        case 'DISLIKE': {
          const favourited = !state?.dislike ? false : null;
          dispatch(action);
          await api.post(`/stats/${video.id}`, { favourited: favourited });
          return;
        }
        default:
          return dispatch(action);
      }
    };
  }

  const asyncDispatch = asyncDispatchMiddleware(dispatch);

  useEffect(() => {
    async function fetchStats() {
      const { data: stats } = await api.get(`/stats/${video.id}`);
      dispatch({ type: 'LOADED' });
      if (stats.favourited) {
        dispatch({ type: 'LIKE' });
      } else if (stats.favourited === false) {
        dispatch({ type: 'DISLIKE' });
      }
    }
    fetchStats();
  }, [video?.id]);

  return (
    <VStack maxW="container.md" height="100vh" mx="auto" py="4">
      <Head>
        <title>{video?.title}</title>
      </Head>
      <VStack pt="20" w="full">
        <iframe
          id="player"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${video?.id}?enablejsapi=1&origin=http://example.com`}
          frameBorder="0"
        />
      </VStack>
      <HStack overflow="scroll" align="start" pt={6} spacing={6}>
        <VStack align="start" flexBasis="75%">
          <Text color="gray.400">{formatDateDistance(video?.publishedAt)}</Text>
          <Heading>{video?.title}</Heading>
          <Text color="gray.300">{video?.description}</Text>
        </VStack>
        <VStack align="start" flexBasis="25%" spacing={6}>
          <HStack spacing="8">
            <StatusButton
              variant="like"
              isLoading={state?.isLoading}
              onClick={() => asyncDispatch({ type: 'LIKE' })}
              selected={!!state?.like}
            />
            <StatusButton
              variant="dislike"
              isLoading={state?.isLoading}
              onClick={() => asyncDispatch({ type: 'DISLIKE' })}
              selected={!!state?.dislike}
            />
          </HStack>
          <Text fontSize="lg" color="gray.400">
            Channel:
            <chakra.span color="white">{` ${video?.channelTitle}`}</chakra.span>
          </Text>
          <Text fontSize="lg" color="gray.400">
            Views:
            <chakra.span color="white">{` ${formatNumber(
              Number(video?.viewCount),
            )}`}</chakra.span>
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const videos = await Promise.all([
    fetchByQuery('disney trailer'),
    fetchByQuery('travel'),
    fetchByQuery('productivity'),
    fetchPopular(),
  ]);

  const paths = videos.flat().map((video) => ({ params: { id: video?.id } }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const video = await fetchById(String(params?.id));
  return {
    props: {
      video,
    },
  };
};

export default VideoPage;
