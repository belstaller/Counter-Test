'use client';

import { useState } from 'react';
import Counter from '@/components/Counter';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './page.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ThemeToggle />
        </div>
        <h1 className={styles.title}>Counter Test</h1>
        <p className={styles.description}>
          A simple counter application built with Next.js, React, and
          TypeScript
        </p>
        <Counter
          count={count}
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
        />
      </div>
    </main>
  );
}
