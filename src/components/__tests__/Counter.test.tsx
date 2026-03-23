import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../Counter';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Render the Counter with controlled props and pre-wired mock handlers. */
function setup(initialCount = 0) {
  const onIncrement = jest.fn();
  const onDecrement = jest.fn();
  const onReset = jest.fn();

  render(
    <Counter
      count={initialCount}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onReset={onReset}
    />
  );

  return {
    onIncrement,
    onDecrement,
    onReset,
    incrementButton: screen.getByRole('button', { name: /increment counter/i }),
    decrementButton: screen.getByRole('button', { name: /decrement counter/i }),
    resetButton: screen.getByRole('button', { name: /reset counter/i }),
    countDisplay: () => screen.getByText(String(initialCount)),
  };
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('Counter – rendering', () => {
  it('renders the initial count', () => {
    render(
      <Counter
        count={0}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onReset={jest.fn()}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders the "Current Count" label', () => {
    render(
      <Counter
        count={0}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onReset={jest.fn()}
      />
    );

    expect(screen.getByText(/current count/i)).toBeInTheDocument();
  });

  it('renders increment, decrement and reset buttons', () => {
    const { incrementButton, decrementButton, resetButton } = setup();

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it('displays a custom initial count passed as a prop', () => {
    render(
      <Counter
        count={42}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onReset={jest.fn()}
      />
    );

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('displays a negative count passed as a prop', () => {
    render(
      <Counter
        count={-5}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onReset={jest.fn()}
      />
    );

    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  it('count display has aria-live="polite" for screen-reader announcements', () => {
    render(
      <Counter
        count={0}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onReset={jest.fn()}
      />
    );

    const display = screen.getByText('0').closest('[aria-live]');
    expect(display).toHaveAttribute('aria-live', 'polite');
  });
});

// ---------------------------------------------------------------------------
// Increment button
// ---------------------------------------------------------------------------

describe('Counter – increment button', () => {
  it('calls onIncrement once on the first click', async () => {
    const user = userEvent.setup();
    const { onIncrement, incrementButton } = setup();

    await user.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onIncrement for each successive click', async () => {
    const user = userEvent.setup();
    const { onIncrement, incrementButton } = setup();

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(3);
  });

  it('does not call onDecrement or onReset when increment is clicked', async () => {
    const user = userEvent.setup();
    const { onIncrement, onDecrement, onReset, incrementButton } = setup();

    await user.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(1);
    expect(onDecrement).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it('calls onIncrement with a click event', async () => {
    const user = userEvent.setup();
    const { onIncrement, incrementButton } = setup();

    await user.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(1);
    expect(onIncrement.mock.calls[0][0]).toMatchObject({ type: 'click' });
  });
});

// ---------------------------------------------------------------------------
// Decrement button
// ---------------------------------------------------------------------------

describe('Counter – decrement button', () => {
  it('calls onDecrement once on the first click', async () => {
    const user = userEvent.setup();
    const { onDecrement, decrementButton } = setup();

    await user.click(decrementButton);

    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement for each successive click', async () => {
    const user = userEvent.setup();
    const { onDecrement, decrementButton } = setup();

    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);

    expect(onDecrement).toHaveBeenCalledTimes(3);
  });

  it('does not call onIncrement or onReset when decrement is clicked', async () => {
    const user = userEvent.setup();
    const { onIncrement, onDecrement, onReset, decrementButton } = setup();

    await user.click(decrementButton);

    expect(onDecrement).toHaveBeenCalledTimes(1);
    expect(onIncrement).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it('calls onDecrement with a click event', async () => {
    const user = userEvent.setup();
    const { onDecrement, decrementButton } = setup();

    await user.click(decrementButton);

    expect(onDecrement).toHaveBeenCalledTimes(1);
    expect(onDecrement.mock.calls[0][0]).toMatchObject({ type: 'click' });
  });
});

// ---------------------------------------------------------------------------
// Reset button
// ---------------------------------------------------------------------------

describe('Counter – reset button', () => {
  it('calls onReset once when clicked', async () => {
    const user = userEvent.setup();
    const { onReset, resetButton } = setup(10);

    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onReset for each successive click', async () => {
    const user = userEvent.setup();
    const { onReset, resetButton } = setup(5);

    await user.click(resetButton);
    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(2);
  });

  it('does not call onIncrement or onDecrement when reset is clicked', async () => {
    const user = userEvent.setup();
    const { onIncrement, onDecrement, onReset, resetButton } = setup(7);

    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onIncrement).not.toHaveBeenCalled();
    expect(onDecrement).not.toHaveBeenCalled();
  });

  it('calls onReset with a click event', async () => {
    const user = userEvent.setup();
    const { onReset, resetButton } = setup();

    await user.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onReset.mock.calls[0][0]).toMatchObject({ type: 'click' });
  });
});

// ---------------------------------------------------------------------------
// Mixed interactions
// ---------------------------------------------------------------------------

describe('Counter – mixed interactions', () => {
  it('calls each handler independently in a mixed sequence', async () => {
    const user = userEvent.setup();
    const { onIncrement, onDecrement, onReset, incrementButton, decrementButton, resetButton } =
      setup();

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(decrementButton);
    await user.click(resetButton);
    await user.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(3);
    expect(onDecrement).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
