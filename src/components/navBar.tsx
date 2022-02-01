import { Box, Button, Heading, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Dropdown from './dropdown';
import { IoIosArrowDown } from 'react-icons/io';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navBarBgColor, setNavBarBgColor] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    setNavBarBgColor(
      window.scrollY === 0
        ? 'linear-gradient(to bottom, black, rgba(0,0,0,0))'
        : 'rgba(0,0,0,0.8)',
    );
  }

  return (
    <HStack
      position="fixed"
      w="full"
      justifyContent="space-between"
      paddingY={3}
      paddingX={12}
      zIndex={1}
      bg={navBarBgColor}
    >
      <HStack gap={4}>
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
      <Box position="relative">
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
    </HStack>
  );
};

export default NavBar;
