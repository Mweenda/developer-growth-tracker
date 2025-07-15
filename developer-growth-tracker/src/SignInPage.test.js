
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from './SignInPage';

test('renders sign in page', () => {
  render(<SignInPage />);
  const linkElement = screen.getByText(/Sign in to your account/i);
  expect(linkElement).toBeInTheDocument();
});
