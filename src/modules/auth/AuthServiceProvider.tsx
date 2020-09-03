import React, { useContext, useState } from 'react';
import {
  register as apiRegister,
  RegisterParams,
  RegisterResponse,
} from '../api/apiRepository';
import { getStoredToken, storeToken } from './tokenStorage';

type RegisterFunction = (values: RegisterParams) => Promise<RegisterResponse>;

interface AuthContextValue {
  register: RegisterFunction;
  initiateReauthorization: () => void;
  isReauthorization: boolean;
  isAuthorized: boolean;
  token: string;
}

export const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthServiceProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string>(getStoredToken());
  const [isReauthorization, setIsReauthorization] = useState<boolean>(false);
  const isAuthorized = !!token;
  const register: RegisterFunction = async ({ name, email }) => {
    const { token, success, errors } = await apiRegister({ name, email });
    if (token) {
      storeToken(token);
      setToken(token);
      setIsReauthorization(false);
    }
    return { success, errors };
  };
  const initiateReauthorization = () => {
    setToken('');
    setIsReauthorization(true);
  };
  return (
    <AuthContext.Provider
      value={{
        initiateReauthorization,
        register,
        isReauthorization,
        isAuthorized,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthServiceProvider;
