import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from './SignInPage';
import { useFirebase } from '../context/AuthContext';

// Mock the useFirebase hook
jest.mock('../context/AuthContext');

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  containerVariants: {},
  itemVariants: {},
}));

describe('SignInPage', () => {
  const mockAuth = {
    signInWithEmailAndPassword: jest.fn(),
  };

  beforeEach(() => {
    useFirebase.mockReturnValue({
      auth: mockAuth,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders sign in form', () => {
    render(<SignInPage />);
    
    expect(screen.getByText(/Sign In to Your Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    mockAuth.signInWithEmailAndPassword.mockResolvedValueOnce({});
    
    render(<SignInPage />);
    
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password123'
      );
    });
  });

  test('displays error message on sign in failure', async () => {
    mockAuth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<SignInPage />);
    
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to sign in/i)).toBeInTheDocument();
    });
  });
}); 