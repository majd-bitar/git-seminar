import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // If you use react-router
// Example imports for your sections (adapt to your file structure)
import IntroSection from './IntroSection';
import HistorySection from './HistorySection';
import CentralVsDistributedSection from './CentralVsDistributedSection';
import BasicCommandsSection from './BasicCommandsSection';
import BranchingAndMergingSection from './BranchingAndMergingSection';
import LocalCloudRepoSection from './LocalCloudRepoSection';
import GitHubStatsSection from './GitHubStatsSection';
import CICDSection from './CICDSection';
import AdvancedCommandsSection from './AdvancedCommandsSection';
import BestPracticesSection from './BestPracticesSection';
import { FaCode, FaClipboardCheck } from 'react-icons/fa'; // Import icons
import styles from './styles.module.css';

export default function Hero() {
  const navigate = useNavigate();

  // Array of sections (10 total). Each has a ref.
  const sections = [
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
    { ref: useRef(null) },
  ];

  // Which section is active
  const [activeSection, setActiveSection] = useState(0);

  // The percentage fill for the progress line
  const [fillPercent, setFillPercent] = useState(0);

  // On scroll, figure out the closest section to the top
  useEffect(() => {
    const handleScroll = () => {
      let minDistance = Infinity;
      let currentIndex = 0;

      sections.forEach((sec, i) => {
        if (sec.ref.current) {
          const rect = sec.ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentIndex = i;
          }
        }
      });

      setActiveSection(currentIndex);

      // The fill line from top circle to bottom circle
      // If there are 10 circles => 9 intervals => fill = index/9 * 100
      const maxIndex = sections.length - 1;
      const percent = (currentIndex / maxIndex) * 100;
      setFillPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to a section if user clicks a circle
  const scrollToSection = (i) => {
    sections[i].ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Handlers for the final buttons
  const handleTryYourself = () => {
    navigate('/visualizer');
  };
  const handleTakeQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className={styles.heroWrapper}>
      {/* LEFT-SIDE VERTICAL STEP WIZARD */}
      <div className={styles.stepsContainer}>
        {/* The track that will be partially filled */}
        <div className={styles.track}>
          {/* The fill line (animated with motion) */}
          <motion.div
            className={styles.fillLine}
            style={{ height: `${fillPercent}%` }}
            transition={{ type: 'tween', duration: 0.2 }}
          />
          {/* Render each circle (1..N) at evenly spaced intervals */}
          {sections.map((_, i) => {
            const isActive = i <= activeSection;
            const positionPercent = (i / (sections.length - 1)) * 100;
            return (
              <div
                key={i}
                className={`${styles.circle} ${isActive ? styles.active : ''}`}
                style={{ top: `${positionPercent}%` }}
                onClick={() => scrollToSection(i)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.content}>
        <IntroSection ref={sections[0].ref} />
        <HistorySection ref={sections[1].ref} />
        <CentralVsDistributedSection ref={sections[2].ref} />
        <BasicCommandsSection ref={sections[3].ref} />
        <BranchingAndMergingSection ref={sections[4].ref} />
        <LocalCloudRepoSection ref={sections[5].ref} />
        <GitHubStatsSection ref={sections[6].ref} />
        <CICDSection ref={sections[7].ref} />
        <AdvancedCommandsSection ref={sections[8].ref} />
        <BestPracticesSection ref={sections[9].ref} />


        {/* FINAL BUTTONS (Now in a Row) */}
        <div className={styles.finalButtons}>
          <button onClick={handleTryYourself} className={styles.actionButton}>
            <FaCode className={styles.icon} />
            Train on Git Basics
          </button>
          <button onClick={handleTakeQuiz} className={styles.actionButton}>
            <FaClipboardCheck className={styles.icon} />
            Take the Git & GitHub Quiz
          </button>
        </div>

        

      </div>
    </div>
  );
}
