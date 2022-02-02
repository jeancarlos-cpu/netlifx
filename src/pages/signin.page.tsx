import {
  Box,
  Container,
  Heading,
  Input,
  FormControl,
  VStack,
  FormLabel,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import isEmail from 'isemail';
import { useRouter } from 'next/router';

type Props = {};

const SignIn: NextPage<Props> = () => {
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsInvalid(false);
    if (!isEmail.validate(email)) {
      setIsInvalid(true);
      return;
    }
    router.push('/');
  }

  return (
    <Container
      display="flex"
      w="full"
      height="100vh"
      align="center"
      justify="center"
    >
      <Head>
        <title>Sign In | Netflix</title>
      </Head>
      <Box
        z-index={-2}
        position="absolute"
        top="0"
        left="0"
        height="100vh"
        width="100%"
        opacity="0.4"
      >
        <Image
          src="/static/signin.jpg"
          alt="signIn"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Heading
        fontSize="5xl"
        color="red.600"
        position="absolute"
        top="0"
        left="0"
        p="6"
      >
        NETFLIX
      </Heading>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        rounded="md"
        align="start"
        spacing="10"
        padding="12"
        bg="rgba(0,0,0,0.7)"
        margin="auto"
        width={400}
        height={400}
        zIndex="1"
      >
        <Heading fontSize="3xl" fontWeight="medium">
          Sign In
        </Heading>
        <FormControl isInvalid={isInvalid}>
          <FormLabel>Email</FormLabel>
          <Input
            errorBorderColor="yellow.400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            colorScheme="red"
            variant="filled"
            bg="#333"
            marginBottom="4"
            _focus={{ bg: '#555' }}
            _hover={{ bg: '#333' }}
          />
          <FormErrorMessage color="yellow.400">
            E-mail inválido
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          size="lg"
          colorScheme="red"
          w="full"
          focusBorderColor="red.600"
        >
          Sign In
        </Button>
      </VStack>
    </Container>
  );
};

export default SignIn;
