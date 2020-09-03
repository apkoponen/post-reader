import React from 'react';
import { NextPage } from 'next';
import LoginScreen from '../modules/login/LoginScreen';
import { useAuth } from '../modules/auth/AuthServiceProvider';
import PostScreen from '../modules/posts/PostScreen';

export const e2eIds = {
  loggedIn: 'logged-in',
};

const HomePage: NextPage = () => {
  const { isAuthorized } = useAuth();
  return (
    <div>
      {isAuthorized ? (
        <div>
          <div data-e2e={e2eIds.loggedIn} />
          <PostScreen />
        </div>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default HomePage;
