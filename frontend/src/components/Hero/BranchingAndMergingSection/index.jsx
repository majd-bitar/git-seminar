import React from 'react';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import styles from './styles.module.css';

const customTemplate = templateExtend(TemplateName.Metro, {
  branch: { label: { font: 'bold 12pt Calibri' } },
  commit: {
    message: { displayHash: false, font: 'italic 10pt Calibri' },
  },
});

/**
 * Demonstrates branching and merging with a simple Gitgraph example
 */
const BranchingAndMergingSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Branching & Merging</h2>
      <p>
        Branches allow you to develop features or fix bugs in isolation.
        Merging (or rebasing) brings those changes back into the main line.
      </p>
      <div className={styles.gitGraphContainer}>
        <Gitgraph options={{ template: customTemplate }}>
          {(gitgraph) => {
            // Main branch
            const main = gitgraph.branch('main');
            main.commit('Initial commit');
            main.commit('Set up project structure');

            // Create a feature branch from main
            const featureA = main.branch('feature/AmazingFeature');
            featureA.commit('Start working on Feature A');

            // Create another branch from main
            const bugFix = main.branch('bugfix/Hotfix123');
            bugFix.commit('Fix urgent bug');
            
            // Merge bugfix back to main
            main.merge(bugFix, 'Merge bugfix into main');

            // Continue on feature A
            featureA.commit('Feature A enhancements');

            // Merge feature A back to main
            main.merge(featureA, 'Complete and merge Feature A');
          }}
        </Gitgraph>
      </div>
      <p>
        By creating branches for individual tasks, you keep your main line
        stable. When the task is done (and code reviewed), merge it back in!
      </p>
    </section>
  );
});

export default BranchingAndMergingSection;
