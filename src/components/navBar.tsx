import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import Dropdown from './dropdown';
import { IoIosArrowDown } from 'react-icons/io';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Container
      maxW="container.xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginY={2}
      zIndex={1}
      position="fixed"
    >
      <HStack gap={4} flex={1}>
        <Heading marginRight={4} color="red.600">
          NETFLIX
        </Heading>
        <NextLink href="/" passHref>
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/my-list" passHref>
          <Link>My List</Link>
        </NextLink>
      </HStack>
      <Box position="relative" marginRight={'100px'}>
        <Button
          rightIcon={<IoIosArrowDown />}
          variant="link"
          color="gray.50"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {'joe.doe'}
        </Button>
        <Dropdown isOpen={isDropdownOpen} />
      </Box>
    </Container>
  );
};

export default NavBar;
