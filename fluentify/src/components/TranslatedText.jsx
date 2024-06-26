import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const TranslatedText = (props) => {
  const { translatedText } = useLanguage();

  const TextAnimation = ({ infinite }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const animationStates = ['', '.', '. .', '. . .', '. .', '.'];
  
    useEffect(() => {
      let timeout;
  
      if (currentIndex <= animationStates.length) {
        timeout = setTimeout(() => {
          setCurrentText(animationStates[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 500);
      } else { 
        setCurrentIndex(0);
        setCurrentText('');
      }

      return () => clearTimeout(timeout);

    }, [currentIndex, infinite]);
  
    return `Translating ${currentText}`;
  };

  return (
    <div className="flex">
      <div className="font-museo border-4 border-gray-700 border-opacity-90 rounded-lg h-screen w-full overflow-auto text-xl p-7 text-left"> 
        {
          props.translating ?
          <div className='italic'><TextAnimation /></div>
          :
          (
            props.error ?
            <div className='text-red-600'>{props.error}... Please go back to <Link to='/' className='font-semibold underline hover:text-red-900'>Home Page</Link> to try again.</div>
            :
            <p>{translatedText}</p>
          )
        }
      </div>
    </div>
  );
};

export default TranslatedText;
