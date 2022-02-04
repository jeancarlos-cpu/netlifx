import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import NextNprogress from 'nextjs-progressbar';
import NavBar from '../components/navBar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <NextNprogress color="#E53E3E" />
      {router.pathname !== '/signin' && <NavBar />}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
