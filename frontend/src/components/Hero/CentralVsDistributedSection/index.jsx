import React from 'react';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import styles from './styles.module.css';

const myTemplate = templateExtend(TemplateName.Metro, {
  branch: { label: { font: 'bold 12pt Calibri' } },
  commit: { message: { displayHash: false, font: 'italic 10pt Calibri' } },
});

const CentralVsDistributedSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Centralized vs. Distributed Git</h2>
      <p>
        A centralized model relies on a single server for commits and updates,
        whereas Git’s distributed model means every clone is a full repository.
      </p>
      <div className={styles.gitGraphContainer}>
        <Gitgraph options={{ template: myTemplate }}>
          {(gitgraph) => {
            // "SVN" style
            const svn = gitgraph.branch('SVN Server');
            svn.commit('Initial commit');

            const dev1 = gitgraph.branch({ name: 'Dev1(SVN)', from: svn });
            dev1.commit('Commit #1 to central');
            svn.merge(dev1, 'Merge Dev1 changes');

            // Git style
            const main = gitgraph.branch('Git Main');
            main.commit('Git initial commit');
            const feature = main.branch('Git Feature');
            feature.commit('Local commit');
            main.merge(feature, 'Merge feature offline');
          }}
        </Gitgraph>
      </div>
    </section>
  );
});

export default CentralVsDistributedSection;
