import { Magic } from 'magic-sdk';

const createMagic = (key: string) => {
  return typeof window !== 'undefined' && new Magic(key);
};

export const magic = createMagic(String(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY));
