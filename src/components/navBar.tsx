import { Box, Button, Heading, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import Dropdown from './dropdown';
import { IoIosArrowDown } from 'react-icons/io';
import api from '../services/api';
import { parseCookies } from 'nookies';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navBarBgColor, setNavBarBgColor] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    async function getEmail() {
      try {
        const email = parseCookies()['user.email'];
        setEmail(email || 'Guest');
      } catch {
        setEmail('Guest');
      }
    }
    try {
      getEmail();
    } catch {}

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  });

  function handleScroll() {
    setNavBarBgColor(
      window.scrollY === 0
        ? 'linear-gradient(to bottom, black, rgba(0,0,0,0))'
        : 'rgba(0,0,0,0.8)',
    );
  }

  async function handleSignOut() {
    try {
      await api.post('/signout');
    } catch {}
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
          {email}
        </Button>
        <Dropdown isOpen={isDropdownOpen} handleSignOut={handleSignOut} />
      </Box>
    </HStack>
  );
};

export default NavBar;
