import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { spacing } from '../../styles/theme';
import Button from '../elements/Button';
import { useAuth } from '../auth/AuthServiceProvider';

export const e2eIds = {
  loginForm: 'login-form',
  emailField: 'login-form-email-field',
  nameField: 'login-form-name-field',
};

export const testIds = {
  emailField: 'email-field',
  nameField: 'name-field',
  submitButton: 'submit-button',
  unexpectedError: 'unexpected-error',
};

interface FormData {
  name: string;
  email: string;
}

const LoginForm = () => {
  const [hasUnexpectedError, setHasUnexpectedError] = useState<boolean>(false);
  const { register } = useAuth();
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      onSubmit={async (
        values: FormData,
        { setSubmitting, setErrors }: FormikHelpers<FormData>
      ) => {
        setHasUnexpectedError(false);
        try {
          const { success, errors } = await register(values);
          if (!success) {
            setSubmitting(false);
            setErrors(errors);
          }
        } catch (e) {
          setHasUnexpectedError(true);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form data-e2e={e2eIds.loginForm}>
          {hasUnexpectedError && (
            <div data-testid={testIds.unexpectedError}>
              An unexpected error happened.
            </div>
          )}
          <div className="field" data-testid={testIds.nameField}>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" data-e2e={e2eIds.nameField} />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className="field" data-testid={testIds.emailField}>
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" data-e2e={e2eIds.emailField} />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="actions">
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid={testIds.submitButton}
            >
              Go
            </Button>
          </div>
          {/*language=CSS*/}
          <style jsx>{`
            label {
              display: block;
            }

            .field {
              margin-bottom: ${spacing.lg};
            }

            .field :global(input) {
              width: 100%;
            }

            .actions {
              text-align: right;
            }
          `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
