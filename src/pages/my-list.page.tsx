import { Container } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import nookies from 'nookies';

import CardsSection from 'components/cardsSection';
import { initializeClient } from 'lib/urql-client';
import { verifyJwt } from 'lib/verify-jwt';

type Props = {
  myListVideos: {
    id: string;
    imgUrl: string;
  }[];
};

const MyList: NextPage<Props> = ({ myListVideos }) => {
  return (
    <Container maxW="container.xl" minH="100vh" mx="auto" pt="120px">
      <Head>
        <title>My list | Netflix</title>
      </Head>
      <CardsSection
        title="My List"
        videos={myListVideos}
        size="verysmall"
        motion={false}
        flexWrap="wrap"
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = initializeClient();

  const { token } = nookies.get(context);
  const userId = verifyJwt(token);

  const { data } = await client
    .query<{ stats: Stats[] }>(QUERY_FAVORITE_VIDEOS, { userId })
    .toPromise();

  if (!data?.stats) {
    return {
      props: {
        myListVideos: [],
      },
    };
  }

  const videos = data.stats.map(({ videoId }) => ({
    id: videoId,
    imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  }));

  return {
    props: {
      myListVideos: videos,
    },
  };
};

type Stats = {
  videoId: string;
};

const QUERY_FAVORITE_VIDEOS = `
  query favouritedVideos($userId: String!) {
    stats(where: {
      userId: {_eq: $userId}, 
      favourited: {_eq: true}
    }) {
      videoId
    }
  }
`;

export default MyList;
