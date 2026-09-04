import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './landing.module.css';

const FEATURES = [
  {
    title: 'Increment & Decrement',
    description:
      'Adjust the count up or down by one with a single click, powered by simple React state.',
  },
  {
    title: 'Reset',
    description:
      'Jump straight back to zero at any time, from any positive or negative value.',
  },
  {
    title: 'Light / Dark Theme',
    description:
      'Switch between a light and dark palette instantly, with your preference remembered on your next visit.',
  },
];

const TECH_STACK = ['Next.js', 'React', 'TypeScript', 'CSS Modules'];

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <ThemeToggle />
      </div>

      <div className={styles.content}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <h1 id="hero-heading" className={styles.title}>
            Counter Test
          </h1>
          <p className={styles.tagline}>
            A small Next.js app built to demonstrate clean state management,
            accessible UI patterns, and a light/dark theming system — one
            counter at a time.
          </p>
          <Link href="/" className={styles.cta}>
            Try the Counter
          </Link>
        </section>

        <section className={styles.features} aria-labelledby="features-heading">
          <h2 id="features-heading" className={styles.sectionTitle}>
            Features
          </h2>
          <div className={styles.featureGrid}>
            {FEATURES.map(feature => (
              <div key={feature.title} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.techStack} aria-labelledby="tech-heading">
          <h2 id="tech-heading" className={styles.sectionTitle}>
            Built With
          </h2>
          <ul className={styles.techList}>
            {TECH_STACK.map(tech => (
              <li key={tech} className={styles.techItem}>
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
