import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import styles from './styles.module.css';

let nextCommitNumber = 2; // For new commits: C2, C3, etc.
function newCommitId() {
  return `C${nextCommitNumber++}`;
}

export default function GitVisualizer() {
  const navigate = useNavigate();
  const svgRef = useRef(null);

  const [commits, setCommits] = useState([{ id: 'C1', parents: [] }]);
  const [branches, setBranches] = useState({ main: 'C1' });
  const [headBranch, setHeadBranch] = useState('main');
  const [newBranch, setNewBranch] = useState("");

  // Clear entire repo
  const handleClear = () => {
    localStorage.clear();
    setCommits([{ id: 'C1', parents: [] }]);
    setBranches({ main: 'C1' });
    setHeadBranch('main');
    nextCommitNumber = 2;
  };

  // Commit
  const handleCommit = () => {
    const newId = newCommitId();
    const parentCommit = branches[headBranch];

    const newCommit = {
      id: newId,
      parents: [parentCommit],
    };
    setCommits((prev) => [...prev, newCommit]);
    setBranches((prev) => ({
      ...prev,
      [headBranch]: newId,
    }));
  };

  // Create new branch (from HEAD's current commit)
  const handleCreateBranch = () => {
    const name = newBranch.trim();
    if (!name) return;
    if (branches[name]) {
      alert(`Branch "${name}" already exists.`);
      return;
    }
    const headCommit = branches[headBranch];
    setBranches((prev) => ({
      ...prev,
      [name]: headCommit,
    }));
    setNewBranch("");
  };

  // Checkout (switch HEAD to an existing branch)
  const handleCheckout = () => {
    const bName = prompt('Enter branch name to checkout:');
    if (!bName || !branches[bName]) {
      alert(`Branch "${bName}" does not exist!`);
      return;
    }
    setHeadBranch(bName);
  };

  // Merge
  const handleMerge = () => {
    const mergeBranch = prompt('Merge which branch into current branch?');
    if (!mergeBranch) return;
    if (!branches[mergeBranch]) {
      alert(`Branch "${mergeBranch}" does not exist.`);
      return;
    }
    if (mergeBranch === headBranch) {
      alert(`Cannot merge a branch into itself.`);
      return;
    }
    const newId = newCommitId();
    const headTip = branches[headBranch];
    const mergeTip = branches[mergeBranch];
    const mergeCommit = {
      id: newId,
      parents: [headTip, mergeTip],
    };
    setCommits((prev) => [...prev, mergeCommit]);
    setBranches((prev) => ({
      ...prev,
      [headBranch]: newId,
    }));
  };

  // Draw/Update the D3 Graph whenever commits/branches change
  useEffect(() => {
    drawGraph();
  }, [commits, branches]);

  function drawGraph() {
    const width = 700;
    const height = 500;

    const nodes = commits.map((c) => ({ id: c.id }));
    const links = commits.flatMap((c) =>
      c.parents.map((p) => ({ source: c.id, target: p }))
    );

    d3.select(svgRef.current).select('svg').remove();

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#1e1e2e');

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).distance(100).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Lines
    svg.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,2');

    // Circles
    svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', d =>
        d.id === branches[headBranch] ? '#e74c3c' : '#ffcc00'
      )
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(
        d3.drag()
          .on('start', (event, d) => {
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            d.fx = null;
            d.fy = null;
          })
      );

    // Text labels
    svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('dx', 20)
      .attr('dy', 5)
      .attr('font-size', 14)
      .attr('fill', '#fff');

    simulation.on('tick', () => {
      svg.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      svg.selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      svg.selectAll('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  }

  return (
    <div className={styles.visualizerWrapper}>
      {/* Back Button aligned to the left */}
      <button onClick={() => navigate('/home')} className={styles.backButton}>
        ⬅ Back
      </button>

      <h2 className={styles.title}>Git Visualizer</h2>
      <p className={styles.subtitle}>Manage branches and commits visually.</p>

      <div className={styles.topRow}>
        <div className={styles.buttonsContainer}>
          <button onClick={handleCommit} className={styles.commitBtn}>
            Commit
          </button>
          <button onClick={handleMerge} className={styles.mergeBtn}>
            Merge
          </button>
          <button onClick={handleClear} className={styles.clearBtn}>
            Clear All
          </button>
        </div>

        {/* Branches info box */}
        <div className={styles.branchesBox}>
          <h3>Branches</h3>
          <p>
            HEAD: <strong>{headBranch}</strong>
          </p>
          <ul>
            {Object.keys(branches).map(b => (
              <li key={b}>
                {b} {b === headBranch && '(HEAD)'}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} className={styles.checkoutBtn}>
            Checkout
          </button>
        </div>
      </div>

      <div className={styles.branchCreateRow}>
        <input
          type="text"
          value={newBranch}
          onChange={e => setNewBranch(e.target.value)}
          placeholder="Enter branch name"
          className={styles.branchInput}
        />
        <button onClick={handleCreateBranch} className={styles.createBranchBtn}>
          Create Branch
        </button>
      </div>

      <div ref={svgRef} className={styles.graphArea} />
    </div>
  );
}
