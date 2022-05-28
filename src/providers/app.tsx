import { ChakraProvider, extendTheme, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

const theme = extendTheme({
  // NOTE: https://colorhunt.co
  //       https://maketintsandshades.com
  colors: {
    primary: {
      main: '#f38181',
      50: '#fef2f2', // 90
      100: '#fde6e6', // 80
      200: '#facdcd', // 60
      300: '#f8b3b3', // 40
      400: '#f59a9a', // 20
      500: '#f38181',
      600: '#db7474', // 10
      700: '#aa5a5a', // 30
      800: '#7a4141', // 50
      900: '#492727', // 70
    },
  },
  components: {
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
