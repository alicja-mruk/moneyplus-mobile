import { Dict } from 'native-base/lib/typescript/theme/tools';

export const buttonStyle = {
  baseStyle: {
    w: '100%',
    minH: '48px',
    rounded: '12',
    _text: {
      fontWeight: '700',
      color: 'white',
    },
  },
  sizes: {
    md: {
      _text: {
        px: '1',
        fontSize: 'md',
        alignSelf: 'center',
      },
    },
  },
  variants: {
    solid: () => {
      return {
        _light: {
          bg: 'primary.200',
          _text: {
            color: 'white',
          },
          _icon: {
            color: 'white',
          },
          _spinner: {
            color: 'white',
          },
          _pressed: {
            bg: 'primary.200:alpha.50',
          },
          _disabled: {
            bg: 'gray.400',
          },
        },
      };
    },
    outline: () => {
      return {
        _light: {
          bg: 'transparent',
          borderWidth: '2',
          borderColor: 'secondary.300',
          _text: {
            fontWeight: '700',
            color: 'primary.200',
          },
          _icon: {
            color: 'white',
          },
          _pressed: {
            bg: 'primary.200:alpha.10',
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
            color: 'secondary.100',
          },
          _pressed: {
            bg: 'secondary.100:alpha.10',
            borderColor: 'secondary.100',
          },
          _disabled: {
            bg: 'gray.200',
          },
        },
      };
    },
  },
};
