
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';

test('renders sign up page', () => {
  render(<SignUpPage />);
  const linkElement = screen.getByText(/Create your account/i);
  expect(linkElement).toBeInTheDocument();
});
