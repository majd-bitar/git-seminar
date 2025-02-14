import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const quizQuestions = [
  {
    question: "Who created Git?",
    options: ["Linus Torvalds", "Bill Gates", "Mark Zuckerberg", "Guido van Rossum"],
    answer: "Linus Torvalds",
  },
  {
    question: "What command initializes a Git repository?",
    options: ["git start", "git init", "git create", "git clone"],
    answer: "git init",
  },
  {
    question: "Which Git command stages changes for commit?",
    options: ["git stage", "git commit", "git add", "git push"],
    answer: "git add",
  },
  {
    question: "What type of Git system is used in GitHub?",
    options: ["Centralized", "Distributed", "Hybrid", "Decentralized"],
    answer: "Distributed",
  },
  {
    question: "Which command creates a new branch?",
    options: ["git branch new", "git create-branch", "git new-branch", "git branch"],
    answer: "git branch",
  },
  {
    question: "Which CI/CD environment is used for testing before production?",
    options: ["Production", "Staging", "Sandbox", "Development"],
    answer: "Staging",
  },
  {
    question: "What does CI in CI/CD stand for?",
    options: ["Continuous Integration", "Continuous Inspection", "Code Inspection", "Central Integration"],
    answer: "Continuous Integration",
  },
  {
    question: "What Git command is used to merge branches?",
    options: ["git join", "git merge", "git combine", "git union"],
    answer: "git merge",
  },
  {
    question: "Which Git command downloads updates from a remote repository?",
    options: ["git fetch", "git pull", "git update", "git sync"],
    answer: "git pull",
  },
  {
    question: "Which of the following best describes a CI/CD pipeline?",
    options: [
      "A set of automated steps that build, test, and deploy software",
      "A GitHub plugin for testing",
      "A command to update Git repositories",
      "A virtual machine for running software",
    ],
    answer: "A set of automated steps that build, test, and deploy software",
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!username) {
      const enteredName = prompt("Enter your name:");
      if (enteredName) {
        setUsername(enteredName);
        localStorage.setItem("username", enteredName);
      } else {
        navigate("/home"); // Redirect if no name is entered
      }
    }
  }, [username, navigate]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === quizQuestions[questionIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (questionIndex + 1 < quizQuestions.length) {
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  return (
    <div className={styles.quizContainer}>
      {showResults ? (
        <div className={styles.results}>
          <h2>🎉 Congrats, {username}! 🎉</h2>
          <p>Your final score: <strong>{score}/10</strong></p>
          <button onClick={() => navigate("/home")} className={styles.backButton}>Go Back</button>
        </div>
      ) : (
        <div className={styles.questionBox}>
          <h3>Question {questionIndex + 1} of {quizQuestions.length}</h3>
          <p className={styles.questionText}>{quizQuestions[questionIndex].question}</p>
          <div className={styles.options}>
            {quizQuestions[questionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${selectedAnswer === option ? styles.selected : ""}`}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
