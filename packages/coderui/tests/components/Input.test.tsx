import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '@/index';
import userEvent from '@testing-library/user-event';
import type { InputProps } from '@/components/Input';

describe('Input', () => {
  const renderComponent = (props: InputProps) => {
    const { container } = render(<Input {...props} />);
    const user = userEvent.setup();

    return {
      container,
      user,
    };
  };

  it('should always show label', () => {
    renderComponent({ label: 'testLabel' });
    expect(screen.getByText('testLabel')).toBeInTheDocument();
  });

  it('should show error when error is showing', () => {
    renderComponent({ label: 'testLabel', error: 'error' });
    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
