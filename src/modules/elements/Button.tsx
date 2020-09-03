import React from 'react';
import { borderRadius, color, spacing } from '../../styles/theme';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button {...rest}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        button {
          background: ${color.brand};
          color: ${color.white};
          padding: ${spacing.md};
          border: 0;
          border-radius: ${borderRadius.sm};
        }

        button:disabled {
          background: ${color.disabled};
        }
      `}</style>
    </button>
  );
};

export default Button;
