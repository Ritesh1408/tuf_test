import React, { useState, useEffect } from 'react';

const Banner = ({ isVisible, description, timer, link }) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVisible, timeLeft]);

  if (!isVisible || timeLeft <= 0) return null;

  return (
    <div className="banner">
      <p>{description}</p>
      <p>Time left: {timeLeft}s</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Click Here</a>}
    </div>
  );
};

export default Banner;
