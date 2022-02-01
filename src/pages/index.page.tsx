import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/banner';
import NavBar from '../components/navBar';

const Home: NextPage = () => {
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
    </>
  );
};

export default Home;
