import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { AuthContext } from '../auth/AuthServiceProvider';
import LoginForm, { testIds } from './LoginForm';

it('should render field errors', async () => {
  const nameError = 'Error in the name.';
  const emailError = 'Error in the email.';
  const { getByTestId } = render(
    <AuthContext.Provider
      value={{
        register: async () => ({
          success: false,
          errors: {
            name: [nameError],
            email: [emailError],
          },
        }),
        isAuthorized: true,
        token: '',
      }}
    >
      <LoginForm />
    </AuthContext.Provider>
  );

  fireEvent.click(getByTestId(testIds.submitButton));

  await waitFor(() => {
    expect(getByTestId(testIds.nameField)).toHaveTextContent(nameError);
    expect(getByTestId(testIds.emailField)).toHaveTextContent(emailError);
  });
});

it('should handle unexpected errors gracefully and notify the user', async () => {
  const { getByTestId } = render(
    <AuthContext.Provider
      value={{
        register: async () => {
          // eslint-disable-next-line no-throw-literal
          throw 'Some very unexpected error that is not even an Error object.';
        },
        isAuthorized: true,
        token: '',
      }}
    >
      <LoginForm />
    </AuthContext.Provider>
  );

  fireEvent.click(getByTestId(testIds.submitButton));

  await waitFor(() => {
    expect(getByTestId(testIds.unexpectedError)).toBeInTheDocument();
  });
});
