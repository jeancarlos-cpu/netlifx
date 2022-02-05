import { Container, VStack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Banner from '../components/banner';
import CardsSection from '../components/cardsSection';
import NavBar from '../components/navBar';
import { fetchByQuery, fetchPopular } from '../lib/videos.reducer';
import api from '../services/api';
import serializeVideosData from '../utils/serializeVideosData';
type Videos = ReturnType<typeof serializeVideosData>;

type Props = {
  [key: string]: Videos;
};

type Stats = {
  videoId: string;
};

const Home: NextPage<Props> = ({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) => {
  const [watchItAgainVideos, setWatchItAgainVideos] =
    useState<Pick<Videos[0], 'id' | 'imgUrl'>[]>();

  useEffect(() => {
    async function fetchWatchItAgain() {
      const { data: stats } = await api.get<Stats[]>('/stats/watched');
      const videos = stats.map(({ videoId }) => ({
        id: videoId,
        imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      }));
      setWatchItAgainVideos(videos);
    }
    fetchWatchItAgain();
  }, []);

  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <Banner
        title="Clifford, the red dog "
        subTitle="a very red dog"
        imgUrl="/static/clifford.webp"
      />
      <Container maxWidth="container.xl" paddingY={8}>
        <VStack spacing={4}>
          <CardsSection title="Disney" size="large" videos={disneyVideos} />
          {watchItAgainVideos?.length && (
            <CardsSection
              title="Watch it again"
              size="small"
              videos={watchItAgainVideos}
            />
          )}
          <CardsSection title="Travel" size="small" videos={travelVideos} />
          <CardsSection title="Productivity" videos={productivityVideos} />
          <CardsSection title="Popular" size="small" videos={popularVideos} />
        </VStack>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const disneyVideos = await fetchByQuery('disney trailer');
  const travelVideos = await fetchByQuery('travel');
  const productivityVideos = await fetchByQuery('productivity');
  const popularVideos = await fetchPopular();

  const oneDayInSeconds = 60 * 60 * 24;

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
    revalidate: oneDayInSeconds,
  };
};
