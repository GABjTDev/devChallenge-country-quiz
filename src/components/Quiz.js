import React, { useState } from 'react'
import BoxSvg from './BoxSvg'
import ButtonAnswers from './ButtonAnswers'
import Spinner from './Spinner'

const Quiz = ({ question, next, nextOn, nextOff }) => {

  const [result, setResult] = useState(null);

  return (
    <div className='box'>
      <BoxSvg />

      {
        !question.title &&
          <div className='box-spin'>
            <Spinner />
          </div>
      }

      {
        question.flag &&
        <div className='flag'>
          <img src={question.flag} alt={question.title} />
        </div>
      }

      <h2>{question.title}</h2>

      {
        question.answers.map(answer => {
          return(
            <ButtonAnswers 
              key={answer.option} 
              question={question} 
              answer={answer} 
              nextOn={nextOn}
              setResult={setResult}
            />
          )
        })
      }

      {
        next &&
          <button className='btn-next' onClick={() => nextOff(result)}>Next</button>
      }

    </div>
  )
}

export default Quiz