import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const IntroSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the Ultimate Git & GitHub Seminar
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Discover the power of distributed version control and how it changed
        the way we develop software. This immersive journey covers everything
        from Git basics to advanced commands and CI/CD.
      </motion.p>
    </section>
  );
});

export default IntroSection;
