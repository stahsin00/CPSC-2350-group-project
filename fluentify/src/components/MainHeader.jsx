import React from "react";
import { useState, useEffect } from "react";

const MainHeader = (props) => {
  const Typewriter = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      let timeout;

      if (currentIndex <= text.length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);
      } else if (infinite) {
        setCurrentIndex(0);
        setCurrentText("");
      }
      return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);

    return <span>{currentText}</span>;
  };

  function handleClick() {
    props.setShowModal(true);
  }

  return (
    <div className="bg-blue-400 py-10 space-x-6">
      <div className="h-12 mb-16 mt-0 text-white text-5xl font-medium leading-tight text-primary">
        {" "}
        <Typewriter text="Find Your Fluent" delay={150} infinite />
      </div>
      <div className="text-3xl font-bold text-white qleading-tight mb-4">
        Are you an intermediate language learner looking for vocabulary
        practice?
      </div>
      <div className="text-2xl text-white qleading-tight">
        Improve your vocabulary by reading texts in your target language
      </div>
      <div className="mt-10">
        <button
          className="bg-white hover:text-blue-400 text-black text-lg font-semibold py-2 px-4 rounded box-shadow: 0 0 0 5px rgba(59, 130, 246, 1.0)"
          style={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          onClick={handleClick}
        >
          Click Here to Learn How to Use Fluentify
        </button>
      </div>
    </div>
  );
};

export default MainHeader;