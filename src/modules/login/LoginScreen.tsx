import React from 'react';
import { borderRadius, color, spacing } from '../../styles/theme';
import LoginForm from './LoginForm';

const LoginScreen = () => {
  return (
    <div className="background">
      <div className="box">
        <h1 className="title">Login</h1>
        <div className="form">
          <LoginForm />
        </div>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .background {
          background: ${color.brandLight};
          padding: ${spacing.lg};
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .box {
          background: ${color.white};
          padding: ${spacing.lg};
          border-radius: ${borderRadius.sm};
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);

          width: 450px;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin-top: 0;
        }

        .form {
          width: 250px;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
