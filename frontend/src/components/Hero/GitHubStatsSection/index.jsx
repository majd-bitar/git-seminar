import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './styles.module.css';

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

/** Add these chartOptions */
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Let our container control size
  plugins: {
    legend: {
      position: 'right',      // place legend to the right
      align: 'center',        // center legend vertically
    },
  },
};

const GitHubStatsSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Git &amp; GitHub Worldwide Stats</h2>
      <p>
        According to various surveys, Git-based platforms dominate modern version
        control. Here’s a sample distribution:
      </p>

      {/* Use a taller, flex container so chart & legend appear side-by-side */}
      <div className={styles.chartContainer}>
        <Pie data={usagePieData} options={chartOptions} />
      </div>
    </section>
  );
});

export default GitHubStatsSection;
