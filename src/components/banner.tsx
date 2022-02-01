import React from 'react';
import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

type Props = {
  title: string;
  subTitle?: string;
  imgUrl?: string;
};

const Banner: React.FC<Props> = ({ title, subTitle, imgUrl }) => {
  return (
    <HStack
      w="100%"
      h="80vh"
      position="relative"
      _before={{
        position: 'absolute',
        content: '""',
        top: 0,
        bgImage: imgUrl,
        bgSize: 'cover',
        filter: 'opacity(0.6)',
        w: '100%',
        h: '100%',
      }}
    >
      <VStack
        position="relative"
        align="start"
        justifyContent="center"
        paddingX={20}
        gap={1}
      >
        <HStack>
          <Text color="red.500" fontSize="5xl">
            N
          </Text>
          <Text>S E R I E S</Text>
        </HStack>
        <Heading
          fontSize="6xl"
          fontWeight="light"
          maxWidth={500}
          css={{ '-webkit-text-stroke': '1px #000' }}
        >
          {title}
        </Heading>
        <Text fontSize="2xl" css={{ '-webkit-text-stroke': '0.5px #000' }}>
          {subTitle}
        </Text>
        <Button
          leftIcon={<FaPlay />}
          fontFamily="sans-serif"
          fontSize="md"
          bg="white"
          color="black"
          maxWidth={100}
          w="full"
        >
          Play
        </Button>
      </VStack>
    </HStack>
  );
};

export default Banner;
