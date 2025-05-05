import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '@/index';

describe('Button', () => {
  const renderComponent = () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>button</Button>);
    const user = userEvent.setup();

    return {
      button: screen.getByRole('button'),
      onClick,
      user,
    };
  };

  it('should render Button', async () => {
    const { onClick, button, user } = renderComponent();
    expect(button).toBeVisible();

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
