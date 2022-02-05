import { Magic as MagicAdmin } from '@magic-sdk/admin';
import { Magic } from 'magic-sdk';

const createMagicClient = (key: string) => {
  return typeof window === 'undefined' ? null : new Magic(key);
};

export const magic = createMagicClient(
  String(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY),
);

export const magicAdmin = new MagicAdmin(process.env.MAGIC_SECRET_KEY);
