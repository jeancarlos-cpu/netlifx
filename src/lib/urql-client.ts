import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from '@urql/core';
import { parseCookies } from 'nookies';

export function initializeClient(ssrToken?: string) {
  const isServerSide = typeof window === 'undefined';

  const ssr = ssrExchange({
    isClient: !isServerSide,
    initialState: undefined,
  });

  const client = createClient({
    url: String(process.env.API_URL),
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange],
    fetchOptions: () => {
      const token = isServerSide ? ssrToken : parseCookies().token;
      return {
        headers: {
          authorization: `Bearer ${token}`,
          ...(isServerSide && {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
          }),
        },
      };
    },
  });

  return client;
}
