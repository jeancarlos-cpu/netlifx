import { BoxProps, ComponentSingleStyleConfig } from '@chakra-ui/react';

export type CardSize = 'large' | 'medium' | 'small';

interface ICard extends ComponentSingleStyleConfig {
  sizes: {
    [key in CardSize]: BoxProps;
  };
}

export const Card: ICard = {
  sizes: {
    large: {
      width: 218,
      minWidth: 218,
      height: 434,
      minHeight: 434,
    },
    medium: {
      width: 158,
      minWidth: 158,
      height: 280,
      minHeight: 280,
    },
    small: {
      width: 300,
      minWidth: 300,
      height: 170,
      minHeight: 170,
    },
  },
  defaultProps: {
    variant: 'medium',
  },
};
