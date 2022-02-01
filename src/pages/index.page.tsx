import { Container, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/banner';
import CardsSection from '../components/cardsSection';
import NavBar from '../components/navBar';

const Home: NextPage = () => {
  const videos = Array.from({ length: 10 }).map(() => ({
    imgUrl: '/static/clifford.webp',
  }));

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
          <CardsSection title="Disney" size="large" videos={videos} />
          <CardsSection title="Productivity" size="medium" videos={videos} />
        </VStack>
      </Container>
    </>
  );
};

export default Home;
