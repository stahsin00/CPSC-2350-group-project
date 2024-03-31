import React, { useState } from 'react'
import { generateText } from '../api/openai';
import { useLanguage } from '../context/LanguageContext';
import Spinner from './Spinner';

const GenerateText = (props) => {
  const { setText } = useLanguage();
  const [generating, setGenerating] = useState(false);

  async function handleClick(difficulty) {
    if (props.loading) return;
    props.setLoading(true);
    setGenerating(true);

    try {
      const currentText = await generateText(difficulty);
      setText(currentText);
    } catch (e) {
      props.setError(e.message);
    } finally {
      setGenerating(false);
      props.setIsOpen(true);
      props.setLoading(false);
    }

  }

  return (
    <div className='w-2/6 h-96 space-y-14 p-4'>
      <div className='text-3xl font-medium'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex text-center justify-center space-x-9 border-black border-2 rounded-lg shadow-lg px-4 py-14'>
        <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('easy')}>Easy</button>
        <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg  font-bold py-2 px-4 rounded' onClick={() => handleClick('medium')}>Average</button>
        <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('hard')}>Hard</button>
        <div className={`${generating ? 'visible' : 'invisible'} absolute bottom-2 text-blue-400 flex transform -translate-x-7`}>
          <Spinner size={5} color={'blue-400'}/>
          Generating...
        </div>
      </div> 
    </div>
  )
}

export default GenerateText