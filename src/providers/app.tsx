import { ChakraProvider, extendTheme, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

const theme = extendTheme({
  // NOTE: https://colorhunt.co/palette/24a19cfaeee7325288d96098
  //       https://maketintsandshades.com/#24a19c
  colors: {
    primary: {
      main: '#24a19c',
      50: '#e9f6f5', // 90
      100: '#d3eceb', // 80
      200: '#a7d9d7', // 60
      300: '#7cc7c4', // 40
      400: '#50b4b0', // 20
      500: '#24a19c',
      600: '#20918c', // 10
      700: '#19716d', // 30
      800: '#12514e', // 50
      900: '#0b302f', // 70
    },
    secondary: {
      main: '#faeee7',
      500: '#faeee7',
      600: '#e1d6d0', // 10
      700: '#afa7a2', // 30
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
