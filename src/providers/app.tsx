import { ChakraProvider, extendTheme, useTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

const theme = extendTheme({
  // NOTE: https://colorhunt.co/palette/24a19cfaeee7325288d96098
  colors: {
    primary: {
      main: '#24A19C',
    },
    secondary: {
      main: '#FAEEE7',
    },
  },
  components: {
    Heading: {
      defaultProps: {
        size: 'md',
      },
    },
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
