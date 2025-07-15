import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('LoadingSpinner', () => {
  test('renders loading spinner with text', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText(/Initializing Matrix/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders with correct structure', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText(/Initializing Matrix/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
}); 