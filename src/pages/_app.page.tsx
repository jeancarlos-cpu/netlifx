import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';

import NavBar from 'components/navBar';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <NextNprogress color="#E53E3E" options={{ showSpinner: false }} />
      {router.pathname !== '/signin' && <NavBar />}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
