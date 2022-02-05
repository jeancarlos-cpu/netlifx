import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { CardSize } from '../styles/components/card';

type Props = {
  id: string;
  imgUrl: string;
  size: CardSize;
  hasMotion?: boolean;
};

const Card: React.FC<Props> = ({
  id,
  imgUrl,
  size = 'medium',
  hasMotion = true,
  ...props
}) => {
  const styles = useStyleConfig('Card', { size });
  const MotionBox = motion<BoxProps>(Box);
  const shouldScale = hasMotion && { whileHover: { scale: 1.05 } };

  return (
    <MotionBox
      as="a"
      cursor="pointer"
      position="relative"
      rounded="sm"
      overflow="hidden"
      __css={styles}
      {...shouldScale}
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
