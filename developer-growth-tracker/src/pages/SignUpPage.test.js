import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpPage from './SignUpPage';
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

describe('SignUpPage', () => {
  const mockAuth = {
    createUserWithEmailAndPassword: jest.fn(),
  };

  const mockUser = {
    user: {
      uid: 'test-uid',
    },
  };

  beforeEach(() => {
    useFirebase.mockReturnValue({
      auth: mockAuth,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders sign up form', () => {
    render(<SignUpPage />);
    
    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    mockAuth.createUserWithEmailAndPassword.mockResolvedValueOnce(mockUser);
    
    render(<SignUpPage />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'john@example.com',
        'password123'
      );
    });
  });

  test('displays error message on weak password', async () => {
    const error = new Error('Password is too weak');
    error.code = 'auth/weak-password';
    mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(error);
    
    render(<SignUpPage />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Password is too weak/i)).toBeInTheDocument();
    });
  });

  test('displays error message on email already in use', async () => {
    const error = new Error('Email already in use');
    error.code = 'auth/email-already-in-use';
    mockAuth.createUserWithEmailAndPassword.mockRejectedValueOnce(error);
    
    render(<SignUpPage />);
    
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/This email address is already in use/i)).toBeInTheDocument();
    });
  });
}); 