import React from 'react';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import styles from './styles.module.css';

const myTemplate = templateExtend(TemplateName.Metro, {
  branch: { label: { font: 'bold 12pt Calibri' } },
  commit: { message: { displayHash: false, font: 'italic 10pt Calibri' } },
});

const LocalCloudRepoSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Local vs. Cloud Repos</h2>
      <p>
        With Git, every developer has a local copy of the entire repository.
        Cloud platforms like GitHub act as convenient remotes for collaboration.
      </p>
      <div className={styles.gitGraphContainer}>
        <Gitgraph options={{ template: myTemplate }}>
          {(gitgraph) => {
            const mainLocal = gitgraph.branch('Local Repo');
            mainLocal.commit('Local commit #1');
            mainLocal.commit('Local commit #2');

            const remote = gitgraph.branch({ name: 'Remote (GitHub)', from: mainLocal });
            remote.commit('Repo on GitHub');

            mainLocal.commit('Local changes');
            remote.merge(mainLocal, 'Push local changes to GitHub');
          }}
        </Gitgraph>
      </div>
    </section>
  );
});

export default LocalCloudRepoSection;
