import { Container, VStack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/banner';
import CardsSection from '../components/cardsSection';
import NavBar from '../components/navBar';
import { fetchByQuery, fetchPopular } from '../lib/videos.reducer';
import serializeVideosData from '../utils/serializeVideosData';
type Videos = ReturnType<typeof serializeVideosData>;

type Props = {
  [key: string]: Videos;
};

const Home: NextPage<Props> = ({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) => {
  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <NavBar />
      <Banner
        title="Clifford, the red dog "
        subTitle="a very red dog"
        imgUrl="/static/clifford.webp"
      />
      <Container maxWidth="container.xl" paddingY={8}>
        <VStack spacing={4}>
          <CardsSection title="Disney" size="large" videos={disneyVideos} />
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
