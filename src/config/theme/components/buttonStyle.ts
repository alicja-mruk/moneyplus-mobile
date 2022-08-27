import { Dict } from 'native-base/lib/typescript/theme/tools';

export const buttonStyle = {
  baseStyle: {
    w: '100%',
    minH: '44px',
    rounded: '8',
    _text: {
      fontWeight: '700',
      color: 'white',
    },
  },
  sizes: {
    md: {
      _text: {
        px: '1',
        fontSize: 'sm',
        alignSelf: 'center',
      },
    },
  },
  variants: {
    solid: ({ colorScheme }: Dict) => {
      return {
        _light: {
          bg: 'primary.500',
          _text: {
            color: 'white',
          },
          _icon: {
            color: 'white',
          },
          _spinner: {
            color: 'white',
          },
          _hover: {
            bg: `${colorScheme}.300`,
          },
          _pressed: {
            bg: `${colorScheme}.300`,
          },
          _disabled: {
            bg: `${colorScheme}.200`,
          },
        },
      };
    },
    outline: ({ colorScheme }: Dict) => {
      return {
        _light: {
          bg: 'transparent',
          borderWidth: '2',
          borderColor: `${colorScheme}.300`,
          _text: {
            fontWeight: '700',
            color: `${colorScheme}.400`,
          },
          _icon: {
            color: 'white',
          },
          _pressed: {
            bg: `${colorScheme}.100`,
            borderColor: `${colorScheme}.400`,
          },
          _disabled: {
            bg: 'gray.200',
          },
        },
      };
    },
    ghost: ({ colorScheme }: Dict) => {
      return {
        _light: {
          bg: 'transparent',
          _text: {
            fontWeight: '600',
            color: `${colorScheme}.400`,
          },
          _pressed: {
            bg: 'gray.100',
            borderColor: `${colorScheme}.400`,
          },
          _disabled: {
            bg: 'gray.200',
          },
        },
      };
    },
  },
};
