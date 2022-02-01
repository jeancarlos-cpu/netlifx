import { VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  isOpen: boolean;
};

const Dropdown: React.FC<Props> = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) {
    return <VStack display="none" />;
  }

  return (
    <VStack
      rounded={4}
      width="100px"
      position="absolute"
      left="calc(50% - 50px)"
      bg="gray.700"
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
        borderBottomColor: 'gray.700',
      }}
    >
      {isOpen && (
        <NextLink href="/login" passHref>
          <Link>Sign out</Link>
        </NextLink>
      )}
    </VStack>
  );
};

export default Dropdown;
