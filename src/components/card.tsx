import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CardSize } from '../styles/components/card';

type Props = {
  id: string;
  imgUrl: string;
  size: CardSize;
};

const Card: React.FC<Props> = ({ id, imgUrl, size = 'medium', ...props }) => {
  const styles = useStyleConfig('Card', { size });
  const MotionBox = motion<BoxProps>(Box);

  return (
    <MotionBox
      as="a"
      cursor="pointer"
      position="relative"
      rounded="sm"
      __css={styles}
      whileHover={{ scale: 1.05 }}
      overflow="hidden"
      {...props}
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
