import { ButtonProps, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';

type Props = {
  variant: 'like' | 'dislike';
  selected: boolean;
} & ButtonProps;

const StatusButton: FC<Props> = ({ selected, variant, ...props }) => {
  return (
    <IconButton
      isRound
      size="lg"
      aria-label="Like"
      variant={selected ? 'solid' : 'outline'}
      colorScheme={selected ? 'gray' : 'white'}
      color={selected ? 'black' : 'white'}
      icon={variant === 'like' ? <AiFillLike /> : <AiFillDislike />}
      {...props}
    />
  );
};

export default StatusButton;
