import { extendTheme } from '@chakra-ui/react';
import { Card } from './components/card';

export const theme = extendTheme({
  components: {
    Card,
  },
  fonts: {
    heading: 'roboto slab',
    body: 'roboto slab',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
