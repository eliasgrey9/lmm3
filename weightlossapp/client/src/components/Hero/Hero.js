import React, { useEffect, useState } from "react";
import style from "./hero.module.css";

const Hero = () => {
  const [typedSentence, setTypedSentence] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sentence =
      "I pledge to lose 23 pounds before August 23rd or else I will give Austin Fisher a $100 Gift card.";

    const typeSentence = () => {
      if (currentIndex < sentence.length) {
        setTypedSentence(
          (prevTypedSentence) => prevTypedSentence + sentence[currentIndex]
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    };

    const typingTimer = setTimeout(typeSentence, 50); // Delay between each character (adjust as needed)

    return () => {
      clearTimeout(typingTimer);
    };
  }, [currentIndex]);

  const highlightWords = (sentence) => {
    const wordsToHighlight = [
      "23",
      "pounds",
      "August",
      "23rd",
      "Austin",
      "Fisher",
      "$100",
      "Gift",
      "card.",
    ];
    const highlightedSentence = sentence.split(" ").map((word, index) => {
      if (wordsToHighlight.includes(word)) {
        return (
          <span className={style.highlighted} key={index}>
            {word + " "}
          </span>
        );
      }
      return word + " ";
    });

    return highlightedSentence;
  };

  return (
    <div className={style.hero}>
      <div className={style.title}>Put your money where your mouth eats.</div>
      <div className={style.sentence}>{highlightWords(typedSentence)}</div>
    </div>
  );
};

export default Hero;
