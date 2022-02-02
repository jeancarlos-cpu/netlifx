import { VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  isOpen: boolean;
  handleSignOut: () => void;
};

const Dropdown: React.FC<Props> = ({ isOpen, handleSignOut }) => {
  if (!isOpen) {
    return <VStack display="none" />;
  }

  return (
    <VStack
      rounded={4}
      width="100px"
      position="absolute"
      left="calc(50% - 50px)"
      bg="#181818"
      p={2}
      marginTop={2}
      _before={{
        content: '" "',
        position: 'absolute',
        left: 'calc(50% - 10px)',
        top: '-9px',

        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid',
        borderBottomColor: '#181818',
      }}
    >
      {isOpen && (
        <NextLink href="/login" passHref>
          <Link onClick={handleSignOut}>Sign out</Link>
        </NextLink>
      )}
    </VStack>
  );
};

export default Dropdown;
