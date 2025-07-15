import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './ErrorMessage';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('ErrorMessage', () => {
  test('renders error message', () => {
    const testMessage = 'This is a test error message';
    render(<ErrorMessage message={testMessage} />);
    
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<ErrorMessage message="Test error" />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('renders with different error messages', () => {
    const { rerender } = render(<ErrorMessage message="First error" />);
    expect(screen.getByText('First error')).toBeInTheDocument();
    
    rerender(<ErrorMessage message="Second error" />);
    expect(screen.getByText('Second error')).toBeInTheDocument();
  });
}); 