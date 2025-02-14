import React from 'react';
import styles from './styles.module.css';

const BestPracticesSection = React.forwardRef(({ finalButtonRef, onTryYourself }, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Best Practices & Next Steps</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Branching Strategy</h3>
          <p>
            Keep a stable <em>main</em> branch. Develop features in separate branches
            and merge via pull requests.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Commit Often</h3>
          <p>
            Small, frequent commits with clear messages make it easier to review
            and track changes.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Code Reviews</h3>
          <p>
            Use pull requests to gather feedback, ensure quality, and share knowledge.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Automate with CI/CD</h3>
          <p>
            Machines can build, test, and deploy your code upon each push, ensuring
            early bug detection and faster releases.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Documentation</h3>
          <p>
            A solid README or wiki for architecture and contribution guidelines
            goes a long way.
          </p>
        </div>
      </div>
      <p>
        Ready to see it all <em>in action</em>? Let’s jump into the interactive environment
        to create, branch, and merge commits visually.
      </p>
    </section>
  );
});

export default BestPracticesSection;
