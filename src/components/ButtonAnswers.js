import React, { useRef } from 'react'

const ButtonAnswers = ({question, answer, nextOn, setResult}) => {

  const option = useRef();

  const handleAnswer = (name) => {

    let res = true;

    const btns = option.current.parentNode.querySelectorAll('.btn-option');
    btns.forEach(btn => {
      if(btn.classList.contains('correct')){
        res = false
      }
    });

    if(res){

      if(name === question.answerCorrect){
        option.current.classList.add('correct');
        setResult(true);
      }else{
        option.current.classList.add('incorrect');
        setResult(false);
        const btns = option.current.parentNode.querySelectorAll('.btn-option');
        btns.forEach(btn => {
          if(btn.querySelector('span').textContent === question.answerCorrect){
            btn.classList.add('correct');
          }
        });
      }
  
      nextOn();

    }

  }

  return (
    <div ref={option} className='btn-option' onClick={() => handleAnswer(answer.name)}>
      <p>{answer.option}<span>{answer.name}</span></p>
        <div className='icon-box show-correct'>
          <span className="material-icons">
            done
          </span>
        </div>
        <div className='icon-box show-error'>
          <span className="material-icons">
            close
          </span>
        </div>
    </div>
  )
}

export default ButtonAnswers