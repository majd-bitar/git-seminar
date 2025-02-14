import React from 'react';
import { FaCode, FaTools, FaRocket, FaServer, FaVial } from 'react-icons/fa';
import styles from './styles.module.css';

const CICDSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Continuous Integration & Continuous Deployment (CI/CD)</h2>
      <p>
        CI/CD is a set of best practices in modern software development that automates the process of integrating code changes, 
        testing them, and deploying them efficiently. It ensures that software remains **reliable, scalable, and easily maintainable**.
      </p>

      <h3 className={styles.subtitle}>Why is CI/CD Important?</h3>
      <ul className={styles.benefitsList}>
        <li>✅ **Faster Development Cycles** – Automates integration & deployment, reducing manual work.</li>
        <li>✅ **Early Bug Detection** – Continuous testing helps identify issues before they reach production.</li>
        <li>✅ **Consistent Deployments** – Ensures every deployment follows a standardized process.</li>
        <li>✅ **Better Collaboration** – Encourages teams to commit changes frequently, reducing conflicts.</li>
        <li>✅ **Scalability** – Can handle small teams to enterprise-level projects with ease.</li>
      </ul>

      {/* ✅ CI/CD Pipeline Flow */}
      <h3 className={styles.subtitle}>CI/CD Pipeline Overview</h3>
      <div className={styles.pipelineContainer}>
        <div className={styles.pipelineCard}>
          <FaCode className={styles.pipelineIcon} />
          <h4>Developing</h4>
          <p>Developers push changes to GitHub repositories.</p>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.pipelineCard}>
          <FaTools className={styles.pipelineIcon} />
          <h4>Testing</h4>
          <p>Automated tests run to verify code correctness.</p>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.pipelineCard}>
          <FaRocket className={styles.pipelineIcon} />
          <h4>Deploying</h4>
          <p>Once tests pass, changes are automatically deployed.</p>
        </div>
      </div>

      <h3 className={styles.subtitle}>How Does GitHub Fit into CI/CD?</h3>
      <p>
        GitHub is widely used in CI/CD pipelines because it provides tools like **GitHub Actions**, which allow developers to automate the testing 
        and deployment process. **Popular CI/CD integrations include**:
      </p>
      <ul className={styles.toolsList}>
        <li>🚀 **GitHub Actions** – Native automation for GitHub projects.</li>
        <li>🐳 **Docker + Kubernetes** – For containerized deployments.</li>
        <li>🛠 **Jenkins, CircleCI, TravisCI** – External CI/CD tools.</li>
        <li>☁️ **AWS, Azure, Google Cloud** – Cloud-based CI/CD deployment.</li>
      </ul>

      {/* ✅ Deployment Environments */}
      <h3 className={styles.subtitle}>Deployment Environments</h3>
      <div className={styles.envContainer}>
        <div className={styles.envCard}>
          <FaServer className={styles.envIcon} />
          <h4>Sandbox</h4>
          <p>A private environment for developers to test changes before pushing them to staging.</p>
        </div>

        <div className={styles.envCard}>
          <FaVial className={styles.envIcon} />
          <h4>Staging</h4>
          <p>A mirror of production used for final testing before deployment.</p>
        </div>

        <div className={styles.envCard}>
          <FaRocket className={styles.envIcon} />
          <h4>Production</h4>
          <p>The live environment where users interact with the application.</p>
        </div>
      </div>
    </section>
  );
});

export default CICDSection;
