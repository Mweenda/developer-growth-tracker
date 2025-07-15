import React from 'react';

// Mock motion component
export const motion = {
  div: React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )),
  button: React.forwardRef(({ children, ...props }, ref) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )),
  span: React.forwardRef(({ children, ...props }, ref) => (
    <span ref={ref} {...props}>
      {children}
    </span>
  )),
  svg: React.forwardRef(({ children, ...props }, ref) => (
    <svg ref={ref} {...props}>
      {children}
    </svg>
  )),
};

// Mock animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const itemVariants = {
  hidden: { y: 0, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}; 