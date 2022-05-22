import { ChakraProvider } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
};
