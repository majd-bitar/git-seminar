import React from 'react';
import styles from './styles.module.css';

const IntroSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Welcome to the Ultimate Git & GitHub Seminar</h2>
      <p>
        Discover the power of distributed version control and how it changed
        the way we develop software. This immersive journey covers everything
        from Git basics to advanced commands and CI/CD.
      </p>
    </section>
  );
});

export default IntroSection;
