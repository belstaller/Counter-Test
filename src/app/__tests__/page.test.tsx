import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

// ---------------------------------------------------------------------------
// next/navigation & ThemeContext stubs required by the App Router page
// ---------------------------------------------------------------------------

// Stub out the ThemeContext so the page renders without a real provider.
jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setup() {
  render(<Home />);

  return {
    incrementButton: screen.getByRole('button', { name: /increment counter/i }),
    decrementButton: screen.getByRole('button', { name: /decrement counter/i }),
    resetButton: screen.getByRole('button', { name: /reset counter/i }),
    count: () =>
      Number(screen.getByLabelText(/current count/i)?.textContent ?? screen.getByText(/^\-?\d+$/).textContent),
  };
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('Home page counter – initial state', () => {
  it('starts at zero', () => {
    render(<Home />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Increment
// ---------------------------------------------------------------------------

describe('Home page counter – increment', () => {
  it('increments from 0 to 1 on the first click', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('button', { name: /increment counter/i }));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('increments to 2 after two clicks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = screen.getByRole('button', { name: /increment counter/i });

    await user.click(btn);
    await user.click(btn);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments correctly after many clicks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = screen.getByRole('button', { name: /increment counter/i });

    for (let i = 0; i < 10; i++) {
      await user.click(btn);
    }

    expect(screen.getByText('10')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Decrement
// ---------------------------------------------------------------------------

describe('Home page counter – decrement', () => {
  it('decrements from 0 to -1 on the first click', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole('button', { name: /decrement counter/i }));

    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('decrements correctly after multiple clicks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const btn = screen.getByRole('button', { name: /decrement counter/i });

    await user.click(btn);
    await user.click(btn);
    await user.click(btn);

    expect(screen.getByText('-3')).toBeInTheDocument();
  });

  it('decrements from a positive value', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const incBtn = screen.getByRole('button', { name: /increment counter/i });
    const decBtn = screen.getByRole('button', { name: /decrement counter/i });

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(decBtn);

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Reset
// ---------------------------------------------------------------------------

describe('Home page counter – reset', () => {
  it('resets the count back to 0 from a positive value', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const incBtn = screen.getByRole('button', { name: /increment counter/i });
    const resetBtn = screen.getByRole('button', { name: /reset counter/i });

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(resetBtn);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('resets the count back to 0 from a negative value', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const decBtn = screen.getByRole('button', { name: /decrement counter/i });
    const resetBtn = screen.getByRole('button', { name: /reset counter/i });

    await user.click(decBtn);
    await user.click(decBtn);
    await user.click(resetBtn);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('allows the counter to be incremented again after a reset', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const incBtn = screen.getByRole('button', { name: /increment counter/i });
    const resetBtn = screen.getByRole('button', { name: /reset counter/i });

    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(resetBtn);
    await user.click(incBtn);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('has no effect when the count is already 0', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const resetBtn = screen.getByRole('button', { name: /reset counter/i });

    await user.click(resetBtn);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Mixed interactions
// ---------------------------------------------------------------------------

describe('Home page counter – mixed interactions', () => {
  it('tracks state correctly across a sequence of mixed actions', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const incBtn = screen.getByRole('button', { name: /increment counter/i });
    const decBtn = screen.getByRole('button', { name: /decrement counter/i });
    const resetBtn = screen.getByRole('button', { name: /reset counter/i });

    // +1 +1 +1 → 3
    await user.click(incBtn);
    await user.click(incBtn);
    await user.click(incBtn);
    expect(screen.getByText('3')).toBeInTheDocument();

    // -1 → 2
    await user.click(decBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    // reset → 0
    await user.click(resetBtn);
    expect(screen.getByText('0')).toBeInTheDocument();

    // -1 -1 → -2
    await user.click(decBtn);
    await user.click(decBtn);
    expect(screen.getByText('-2')).toBeInTheDocument();

    // +1 → -1
    await user.click(incBtn);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });
});
