import { extendTheme, ITheme } from 'native-base';

import { buttonStyle, textStyle } from './components';
import { colorPalette, fontConfig, fonts, fontSizes } from './foundations';

export const theme: ITheme = extendTheme({
  fontConfig,
  fonts,
  fontSizes,
  colors: colorPalette,
  components: {
    Button: buttonStyle,
    Text: textStyle,
  },
});
