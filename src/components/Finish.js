import React from 'react'
import FINISH2 from '../assets/finish2.svg';

const Finish = ({counter, resetGame}) => {
  return (
    <div className='box finish animate__animated animate__zoomInDown'>
      <div className='box-finish-img'>
        <img src={FINISH2} alt='imagen finish' />
      </div>
      <h2>Results</h2>
      <p>You got <span className={counter.correct === 0 ? 'zero': ''}>{counter.correct}</span> correct answers</p>
      <button onClick={resetGame}>Try again</button>
    </div>
  )
}

export default Finish