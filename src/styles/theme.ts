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
      '*:focus': {
        boxShadow: '0 0 0 1px #E53E3E !important',
        outline: '0 !important',
        borderColor: '#E53E3E !important',
      },
      body: {
        bg: '#121212',
        color: 'gray.50',
      },
    },
  },
});
