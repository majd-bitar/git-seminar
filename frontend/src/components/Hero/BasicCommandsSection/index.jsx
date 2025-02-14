import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const commands = [
  {
    cmd: 'git init',
    desc: 'Initialize a new repository.',
    extra: 'Use this once per project to start tracking changes.',
  },
  {
    cmd: 'git clone <repo_url>',
    desc: 'Clone an existing repository from a remote source.',
    extra: 'This creates a local copy of the repository.',
  },
  {
    cmd: 'git add <files>',
    desc: 'Stage changes for the next commit.',
    extra: 'You can specify single files or "." to add everything.',
  },
  {
    cmd: 'git commit -m "msg"',
    desc: 'Commits staged changes with a descriptive message.',
    extra: 'Always be descriptive with the commit message.',
  },
  {
    cmd: 'git status',
    desc: 'Shows the status of changes as untracked, modified, or staged.',
    extra: 'Useful before committing to check what’s staged.',
  },
  {
    cmd: 'git push',
    desc: 'Push committed changes to a remote repository.',
    extra: 'Usually followed by "git push origin <branch>" to specify a branch.',
  },
  {
    cmd: 'git pull',
    desc: 'Fetch and merge changes from a remote repository.',
    extra: 'Keeps your local repository up to date with remote changes.',
  },
  {
    cmd: 'git branch',
    desc: 'List all branches in the repository.',
    extra: 'Use "git branch <branch-name>" to create a new branch.',
  },
  {
    cmd: 'git checkout <branch>',
    desc: 'Switch to another branch.',
    extra: 'Use "git checkout -b <branch>" to create and switch to a new branch.',
  },
  {
    cmd: 'git merge <branch>',
    desc: 'Merge changes from another branch into the current branch.',
    extra: 'Ensure your working directory is clean before merging.',
  },
  {
    cmd: 'git log',
    desc: 'Displays commit history.',
    extra: 'Use "git log --oneline" for a compact view.',
  },
  {
    cmd: 'git reset <file>',
    desc: 'Unstages a file from the staging area.',
    extra: 'Use "git reset --hard HEAD" to reset everything to the last commit.',
  },
  {
    cmd: 'git revert <commit>',
    desc: 'Create a new commit that undoes a previous commit.',
    extra: 'Does not modify history like "git reset".',
  },
  {
    cmd: 'git stash',
    desc: 'Temporarily saves changes without committing them.',
    extra: 'Use "git stash pop" to retrieve stashed changes.',
  },
  {
    cmd: 'git remote -v',
    desc: 'Displays the remote repositories linked to the project.',
    extra: 'Use "git remote add <name> <url>" to add a new remote.',
  },
  {
    cmd: 'git fetch',
    desc: 'Downloads changes from the remote repository without merging.',
    extra: 'Use "git merge origin/<branch>" to merge after fetching.',
  },
  {
    cmd: 'git diff',
    desc: 'Shows differences between working directory and last commit.',
    extra: 'Use "git diff --staged" to see staged changes.',
  },
  {
    cmd: 'git tag <tagname>',
    desc: 'Creates a tag for a specific commit.',
    extra: 'Tags are often used for versioning releases.',
  },
  {
    cmd: 'git rebase <branch>',
    desc: 'Reapply commits from one branch onto another.',
    extra: 'Use with caution to avoid rewriting shared history.',
  },
  {
    cmd: 'git cherry-pick <commit>',
    desc: 'Apply a specific commit from another branch.',
    extra: 'Useful for applying bug fixes from one branch to another.',
  },
  {
    cmd: 'git bisect',
    desc: 'Finds the commit that introduced a bug using binary search.',
    extra: 'Run "git bisect start", then "git bisect good" or "git bisect bad".',
  },
];

const BasicCommandsSection = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className={styles.section}>
      <h2>Basic Git Commands</h2>
      <p>These form your everyday workflow. Hover to see details:</p>
      <div className={styles.commandsGrid}>
        {commands.map((item) => (
          <CommandHoverCard key={item.cmd} item={item} />
        ))}
      </div>
    </section>
  );
});

function CommandHoverCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.commandCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{item.cmd}</h3>
      <p>{item.desc}</p>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className={styles.hoverExtra}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            <p>{item.extra}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicCommandsSection;
