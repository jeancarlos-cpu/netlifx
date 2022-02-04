import { Magic } from 'magic-sdk';
import { Magic as MagicAdmin } from '@magic-sdk/admin';

const createMagicClient = (key: string) => {
  return typeof window === 'undefined' ? null : new Magic(key);
};

export const magic = createMagicClient(
  String(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY),
);

export const magicAdmin = new MagicAdmin(process.env.MAGIC_SECRET_KEY);
