import React from 'react';
import styles from './Counter.module.css';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  onIncrement,
  onDecrement,
  onReset,
}) => {
  return (
    <div className={styles.counter}>
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.decrement}`}
          onClick={onDecrement}
          aria-label="Decrement counter"
        >
          −
        </button>
        <button
          className={`${styles.button} ${styles.reset}`}
          onClick={onReset}
          aria-label="Reset counter"
        >
          Reset
        </button>
        <button
          className={`${styles.button} ${styles.increment}`}
          onClick={onIncrement}
          aria-label="Increment counter"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
