import { extendTheme, ITheme } from 'native-base';

import { buttonStyle } from './components/buttonStyle';
import { inputStyle } from './components/inputStyle';
import { textStyle } from './components/textStyle';
import { colorPalette } from './foundations/colorPalette';
import { fontConfig, fonts, fontSizes } from './foundations/fonts';

export const theme: ITheme = extendTheme({
  fontConfig,
  fonts,
  fontSizes,
  colors: colorPalette,
  components: {
    Button: buttonStyle,
    Text: textStyle,
    Input: inputStyle,
  },
});
