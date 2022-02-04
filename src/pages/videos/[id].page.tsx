import { Heading, HStack, Text, VStack, chakra } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FC, useReducer } from 'react';
import NavBar from '../../components/navBar';
import {
  fetchById,
  fetchByQuery,
  fetchPopular,
} from '../../lib/videos.reducer';
import formatDateDistance from '../../utils/formatDateDistance';
import formatNumber from '../../utils/formatNumber';
import type serializeVideosData from '../../utils/serializeVideosData';
import StatusButton from './components/statusButton';

type Props = {
  video: ReturnType<typeof serializeVideosData>[number];
};

type Action = {
  type: 'like' | 'dislike' | 'default';
};

type StatusState = {
  like: boolean;
  dislike: boolean;
};

const initialState: StatusState = {
  like: false,
  dislike: false,
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'like':
      return {
        ...state,
        like: !state.like,
        dislike: false,
      };
    case 'dislike':
      return {
        ...state,
        like: false,
        dislike: !state.dislike,
      };
    case 'default':
      return {
        ...initialState,
      };
    default:
      break;
  }
}

const VideoPage: FC<Props> = ({ video }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Head>
        <title>{video?.title}</title>
      </Head>
      <NavBar />
      <VStack maxW="container.md" height="100vh" mx="auto" py="4">
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
            <Text color="gray.400">
              {formatDateDistance(video?.publishedAt)}
            </Text>
            <Heading>{video?.title}</Heading>
            <Text color="gray.300">{video?.description}</Text>
          </VStack>
          <VStack align="start" flexBasis="25%" spacing={6}>
            <HStack spacing="8">
              <StatusButton
                variant="like"
                onClick={() => dispatch({ type: 'like' })}
                selected={!!state?.like}
              />
              <StatusButton
                variant="dislike"
                onClick={() => dispatch({ type: 'dislike' })}
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
    </>
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
