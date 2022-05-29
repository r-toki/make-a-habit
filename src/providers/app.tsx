import { ChakraProvider, extendTheme, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

const theme = extendTheme({
  // NOTE: https://colorhunt.co
  //       https://maketintsandshades.com
  //       color scale 参考値
  //       50: 90, 100: 80, 200: 60, 300: 40, 400: 20
  //       600: 10, 700: 30, 800: 50, 900: 70
  colors: {
    primary: {
      main: '#9adcff',
      100: '#ebf8ff',
      500: '#9adcff',
    },
  },
  components: {
    Button: { defaultProps: { colorScheme: 'primary' } },
    Heading: { defaultProps: { size: 'md' } },
  },
});

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};

export const useAppTheme = () => useTheme<typeof theme>();
