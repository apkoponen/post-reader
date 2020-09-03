import React from 'react';
import { borderRadius, color, spacing } from '../../styles/theme';

type ButtonVariant = 'dark' | 'brand';

const Button: React.FC<
  { variant?: ButtonVariant } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ variant, children, className, ...rest }) => {
  variant = variant || 'brand';
  return (
    <button className={`${className || ''} ${variant}`} {...rest}>
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

        button.dark {
          background: ${color.dark};
        }
      `}</style>
    </button>
  );
};

export default Button;
