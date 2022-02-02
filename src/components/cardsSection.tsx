import { Heading, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { CardSize } from '../styles/components/card';
import Card from './card';
import type serializeVideosData from '../utils/serializeVideosData';
import Link from 'next/link';

type Videos = ReturnType<typeof serializeVideosData>;

type Props = {
  title: string;
  size?: CardSize;
  videos?: Videos;
};

const CardsSection: FC<Props> = ({ title, size = 'medium', videos }) => {
  return (
    <VStack w="full" align="start" paddingX={12}>
      <Heading fontSize="2xl">{title}</Heading>
      <HStack
        paddingY={4}
        maxWidth="full"
        overflowX={'scroll'}
        overflowY={'hidden'}
      >
        {videos?.map(({ imgUrl, id }) => (
          <Link key={id} href={`/videos/${id}`} passHref>
            <Card id={id} size={size} imgUrl={imgUrl} />
          </Link>
        ))}
      </HStack>
    </VStack>
  );
};

export default CardsSection;
