import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { CardSize } from '../styles/components/card';

type Props = {
  imgUrl: string;
  size: CardSize;
};

const Card: React.FC<Props> = ({ imgUrl, size = 'medium' }) => {
  const styles = useStyleConfig('Card', { size });
  const MotionBox = motion<BoxProps>(Box);

  return (
    <MotionBox
      position="relative"
      overflow="hidden"
      rounded="sm"
      __css={styles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      _hover={{ zIndex: 1 }}
    >
      <Image
        src={imgUrl}
        // placeholder="blur"
        alt="movie"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </MotionBox>
  );
};

export default Card;
