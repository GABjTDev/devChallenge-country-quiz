import Finish from "./components/Finish";
import Quiz from "./components/Quiz";
import useQuestion from "./hooks/useQuestion";
import 'animate.css';

function App() {

  const {
    question, 
    counter, 
    next,
    nextOn,
    nextOff,
    resetGame,
    finish
  } = useQuestion();

  return (
    <>
      <div className="container">
        <h1>COUNTRY QUIZ</h1>

        {
          finish ? 
            (
              <Finish counter={counter} resetGame={resetGame} />
            )
            :
            (
              <Quiz 
                question={question} 
                next={next} 
                nextOn={nextOn} 
                nextOff={nextOff}
              />
            )
        }


      </div>
      <footer>
        <p>Created by <a href="https://github.com/GABjTDev" target='_blank' rel="noreferrer">Gabriel Rea</a> - <a href="https://devchallenges.io/" target='_blank' rel="noreferrer">devChallenges.io</a></p>
      </footer>
    </>
  );
}

export default App;
