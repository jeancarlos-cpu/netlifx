import { Heading, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { CardSize } from '../styles/components/card';
import Card from './card';

type Videos = {
  imgUrl: string;
};

type Props = {
  title: string;
  size?: CardSize;
  videos?: Videos[];
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
        {videos?.map(({ imgUrl }, index) => (
          <Card key={index} size={size} imgUrl={imgUrl} />
        ))}
      </HStack>
    </VStack>
  );
};

export default CardsSection;
