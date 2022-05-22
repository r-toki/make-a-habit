import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

const theme = extendTheme({
  components: {
    Heading: {
      defaultProps: {
        size: 'lg',
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
