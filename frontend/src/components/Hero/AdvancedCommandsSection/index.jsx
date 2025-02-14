import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const advancedCommands = [
  {
    cmd: 'git stash',
    desc: 'Temporarily store uncommitted changes.',
    extra: 'Allows switching branches without losing work.',
  },
  {
    cmd: 'git stash pop',
    desc: 'Retrieve and apply the most recent stashed changes.',
    extra: 'Removes the stash after applying it.',
  },
  {
    cmd: 'git rebase -i HEAD~n',
    desc: 'Interactively rebase the last n commits.',
    extra: 'Allows editing, reordering, and squashing commits.',
  },
  {
    cmd: 'git reflog',
    desc: 'Show a log of all changes (even deleted commits).',
    extra: 'Useful for recovering lost commits.',
  },
  {
    cmd: 'git cherry-pick <commit>',
    desc: 'Apply a specific commit from another branch.',
    extra: 'Useful for bringing specific changes without merging an entire branch.',
  },
  {
    cmd: 'git blame <file>',
    desc: 'Show the commit history for each line in a file.',
    extra: 'Useful for tracking changes and identifying authors.',
  },
  {
    cmd: 'git bisect start',
    desc: 'Start a binary search to find a bug-introducing commit.',
    extra: 'Uses `git bisect good` and `git bisect bad` to narrow down changes.',
  },
  {
    cmd: 'git worktree add ../new-branch <branch>',
    desc: 'Create a separate directory for working on another branch.',
    extra: 'Useful for working on multiple branches simultaneously.',
  },
  {
    cmd: 'git reset --soft HEAD~1',
    desc: 'Undo the last commit but keep changes staged.',
    extra: 'Useful when you forgot to include a file in the last commit.',
  },
  {
    cmd: 'git reset --hard HEAD~1',
    desc: 'Completely remove the last commit and its changes.',
    extra: 'Use with caution, as it deletes changes permanently.',
  },
  {
    cmd: 'git clean -df',
    desc: 'Delete untracked files and directories.',
    extra: 'Use with caution, as it removes files permanently.',
  },
  {
    cmd: 'git submodule add <repo_url> <path>',
    desc: 'Add a Git repository as a submodule.',
    extra: 'Useful for managing dependencies in separate repositories.',
  },
  {
    cmd: 'git submodule update --init --recursive',
    desc: 'Clone and update all submodules.',
    extra: 'Ensures that submodules are correctly initialized.',
  },
  {
    cmd: 'git sparse-checkout set <folder>',
    desc: 'Enable partial cloning by specifying which folders to check out.',
    extra: 'Useful for large repositories where you don’t need all files.',
  },
  {
    cmd: 'git filter-branch --tree-filter "rm -rf secrets.txt" HEAD',
    desc: 'Remove a file from all commits in history.',
    extra: 'Use `git push --force` after modifying history.',
  },
  {
    cmd: 'git rerere',
    desc: 'Reuse previously recorded conflict resolutions.',
    extra: 'Saves time when resolving recurring merge conflicts.',
  },
  {
    cmd: 'git send-email',
    desc: 'Send patches via email.',
    extra: 'Common in projects that accept patches instead of pull requests.',
  },
  {
    cmd: 'git format-patch -n <branch>',
    desc: 'Create patch files for a series of commits.',
    extra: 'Used for contributing patches to open-source projects.',
  },
  {
    cmd: 'git fsck',
    desc: 'Check for and report errors in the repository.',
    extra: 'Useful for detecting corruption in the repository.',
  },
  {
    cmd: 'git daemon --export-all --base-path=/repo',
    desc: 'Create a read-only Git server.',
    extra: 'Useful for sharing repositories without setting up SSH or HTTPS.',
  }
];


const AdvancedCommandsSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Advanced Git Commands</h2>
      <p>Hover for details:</p>
      <div className={styles.commandsGrid}>
        {advancedCommands.map((cmd) => (
          <CommandHoverCard key={cmd.cmd} cmd={cmd} />
        ))}
      </div>
    </section>
  );
});

function CommandHoverCard({ cmd }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.commandCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{cmd.cmd}</h3>
      <p>{cmd.desc}</p>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className={styles.hoverExtra}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            <p>{cmd.extra}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdvancedCommandsSection;
