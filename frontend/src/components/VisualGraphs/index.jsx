import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import styles from './styles.module.css';

const VisualGitGraphs = () => {
  const ref = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const data = {
      nodes: [
        { id: 'Commit 1' },
        { id: 'Commit 2' },
        { id: 'Commit 3' },
        { id: 'Feature Branch' },
        { id: 'Main Branch' },
      ],
      links: [
        { source: 'Commit 1', target: 'Commit 2' },
        { source: 'Commit 2', target: 'Commit 3' },
        { source: 'Commit 2', target: 'Feature Branch' },
        { source: 'Commit 1', target: 'Main Branch' },
      ],
    };

    // Remove any existing SVG
    d3.select(ref.current).select('svg').remove();

    // Create the SVG
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw lines (links)
    const link = svg
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Draw nodes
    const node = svg
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', '#3498db')
      .call(
        d3
          .drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Add labels
    const labels = svg
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text((d) => d.id)
      .attr('dx', 20)
      .attr('dy', 5)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('fill', '#555');

    // Update positions on every tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });
  }, []);

  return (
    <section className={styles.gitGraphContainer}>
      <motion.h2
        className={styles.gitGraphTitle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Visual Git Graphs & Workflows
      </motion.h2>

      <motion.div
        className={styles.gitGraphExplanation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p>
          Below is a simple force-directed graph showing an example of Git commits
          and branches. Drag the nodes around to explore!
        </p>
      </motion.div>

      <div ref={ref} className={styles.gitGraphArea}></div>
    </section>
  );
};

export default VisualGitGraphs;
