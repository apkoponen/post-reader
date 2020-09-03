import React from 'react';
import { NextPage } from 'next';
import LoginScreen from '../modules/login/LoginScreen';
import { useAuth } from '../modules/auth/AuthServiceProvider';

export const e2eIds = {
  loggedIn: 'logged-in',
};

const HomePage: NextPage = () => {
  const { isAuthorized } = useAuth();
  return (
    <div>
      {isAuthorized ? (
        <div data-e2e={e2eIds.loggedIn}>Logged In!</div>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default HomePage;
