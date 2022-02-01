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
    css: {},
    global: {
      '&::-webkit-scrollbar': {
        width: '0',
        background: 'transparent',
      },
      body: {
        bg: '#121212',
        color: 'gray.50',
      },
    },
  },
});
