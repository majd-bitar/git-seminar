import React from 'react';
import styles from './styles.module.css';
const HistorySection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>History: Pre-Git vs. Post-Git</h2>
      <div className={styles.historyLayout}>
        <div>
          <p>
            Before Git, centralized systems like SVN or CVS forced developers to rely
            on a single server for version history. If that server went down, everyone
            was stuck. Enter Git, created by <strong>Linus Torvalds</strong> in 2005.
          </p>
          <p>
            This distributed system drastically improved speed, offline work, and 
            resilience—no single point of failure.
          </p>
        </div>
        <img
          src="/linus-pic.jpg"
          alt="Linus Torvalds"
          className={styles.linusPic}
        />
      </div>
      <p>
        Linus, known for the Linux kernel, developed Git to manage that project’s
        development. Today, it’s the de facto standard in version control.
      </p>
    </section>
  );
});

export default HistorySection;
