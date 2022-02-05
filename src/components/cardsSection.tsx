import {
  Heading,
  HStack,
  Skeleton,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { CardSize } from '../styles/components/card';
import Card from './card';
import Link from 'next/link';

type Video = {
  id: string;
  imgUrl: string;
};

type Props = {
  title: string;
  size?: CardSize;
  videos?: Video[];
  isLoading?: boolean;
};

const CardsSection: FC<Props> = ({
  title,
  size = 'medium',
  videos,
  isLoading = false,
}) => {
  const styles = useStyleConfig('Card', { size });

  return (
    <VStack w="full" align="start" paddingX={12}>
      <Heading fontSize="2xl">{title}</Heading>
      <HStack
        paddingY={4}
        maxWidth="full"
        overflowX={'scroll'}
        overflowY={'hidden'}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                height={Number(styles.height)}
                width={Number(styles.width)}
              />
            ))
          : videos?.map(({ imgUrl, id }) => (
              <Link key={id} href={`/videos/${id}`} passHref>
                <Card id={id} size={size} imgUrl={imgUrl} />
              </Link>
            ))}
      </HStack>
    </VStack>
  );
};

export default CardsSection;
