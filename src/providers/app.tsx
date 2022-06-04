import { ChakraProvider, extendTheme, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';
import { CollectionsProvider } from './collections';

const theme = extendTheme({
  // NOTE: https://colorhunt.co
  //       https://maketintsandshades.com
  //       color scale 参考値
  //       50: 90, 100: 80, 200: 60, 300: 40, 400: 20
  //       600: 10, 700: 30, 800: 50, 900: 70
  colors: {
    primary: {
      main: '#6fb2d2',
      100: '#e2f0f6',
      500: '#6fb2d2',
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
        <CollectionsProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CollectionsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export const useAppTheme = () => useTheme<typeof theme>();
