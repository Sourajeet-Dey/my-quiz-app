import React, { useState } from "react";
import medicines from "../data/questions";
import styles from "../styles/quiz.module.css";
import dynamic from "next/dynamic";

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const Quiz = () => {
  const [randomMedicineIndex, setRandomMedicineIndex] = useState(
    getRandomIndex(medicines)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState(medicines[randomMedicineIndex].name);

  const randomMedicine = medicines[randomMedicineIndex];

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setRandomMedicineIndex(getRandomIndex(medicines));
    setAnswer(medicines[randomMedicineIndex].name);
    setShowAnswer(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Guess the Usage and Side Effects</h1>
      <p className={styles.answer}>Medicine: {answer}</p>

      {showAnswer ? (
        <div>
          <p>Uses: {randomMedicine.uses.join(", ")}</p><br/>
          <p>Side Effects: {randomMedicine.side_effects.join(", ")}</p><br/>
          <button className={styles.button} onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={handleRevealAnswer}>
          Reveal Answer
        </button>
      )}
    </div>
  );
};

// export default Quiz;
export default dynamic(() => Promise.resolve(Quiz), { ssr: false });