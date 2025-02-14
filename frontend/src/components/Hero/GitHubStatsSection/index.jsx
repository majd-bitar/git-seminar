import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './styles.module.css';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const usagePieData = {
  labels: ['GitHub', 'GitLab', 'Bitbucket', 'Other'],
  datasets: [
    {
      label: 'Dev Platforms (2023)',
      data: [65, 20, 10, 5],
      backgroundColor: ['#3498db', '#e74c3c', '#f1c40f', '#9b59b6'],
    },
  ],
};

const GitHubStatsSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Git & GitHub Worldwide Stats</h2>
      <p>
        According to various surveys, Git-based platforms dominate modern version control.
        Here’s a sample distribution:
      </p>
      <div className={styles.chartContainer}>
        <Pie data={usagePieData} />
      </div>
    </section>
  );
});

export default GitHubStatsSection;
