// src/components/TypingAnimation.jsx

import React, { useState, useEffect } from 'react';

// A simple TypingAnimation component
const TypingAnimation = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenWords = 1000;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        // Deleting text
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
      } else {
        // Typing text
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
      }
    };

    let timeoutId = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    // After typing, start deleting
    if (!isDeleting && displayedText === words[currentWordIndex]) {
      setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } 
    // After deleting, move to the next word
    else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
    
    return () => clearTimeout(timeoutId);

  }, [displayedText, isDeleting, currentWordIndex, words, deletingSpeed, typingSpeed, delayBetweenWords]);

  return <span className="typing-text">{displayedText}</span>;
};

export default TypingAnimation;