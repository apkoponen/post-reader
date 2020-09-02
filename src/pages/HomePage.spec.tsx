import { render } from '@testing-library/react';
import React from 'react';
import HomePage from './HomePage';

it('should render without errors', async () => {
  const { container } = render(<HomePage />);
  expect(container.querySelector('div')).toBeInTheDocument();
});
