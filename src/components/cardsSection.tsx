import {
  Flex,
  FlexProps,
  Heading,
  Skeleton,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { CardSize } from 'styles/components/card';

import Card from './card';

type Video = {
  id: string;
  imgUrl: string;
};

type Props = {
  title: string;
  size?: CardSize;
  videos?: Video[];
  isLoading?: boolean;
  motion?: boolean;
} & FlexProps;

const CardsSection: FC<Props> = ({
  title,
  size = 'medium',
  videos,
  isLoading = false,
  motion = true,
  ...props
}) => {
  const styles = useStyleConfig('Card', { size });

  return (
    <VStack w="full" align="start" paddingX={12}>
      <Heading fontSize="2xl">{title}</Heading>
      <Flex
        paddingY={4}
        maxWidth="full"
        overflowX={'scroll'}
        overflowY={'hidden'}
        gap={2}
        {...props}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                height={Number(styles.height)}
                width={Number(styles.width)}
              />
            ))
          : videos?.map(({ imgUrl, id }) => (
              <Link key={id} href={`/videos/${id}`} passHref>
                <Card id={id} size={size} imgUrl={imgUrl} hasMotion={motion} />
              </Link>
            ))}
      </Flex>
    </VStack>
  );
};

export default CardsSection;
