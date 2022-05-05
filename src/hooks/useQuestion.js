import { useState, useEffect } from 'react';
import axios from 'axios';

const initialQuestion = {
  title: null,
  flag: null,
  answers: [],
  answerCorrect: null
}

const initialCountries = ['Peru', 'Uruguay', 'Argentina', 'Gambia', 'Vietnam', 'Martinique', 'Guam', 'Georgia', 'United States', 'Belize', 'Ecuador', 'Brazil', 'Uganda', 'Qatar', 'Mongolia', 'Chile', 'Liberia', 'Taiwan', 'Togo', 'Germany'];
const answerType = ['capital', 'flag'];

const generateRandom = (numLength) => {
  return Math.floor(Math.random() * numLength)
}

const useQuestion = () => {

  const [question, setQuestion] = useState(initialQuestion);
  const [countries, setCountries] = useState([]);
  const [next, setNext] = useState(false);
  const [counter, setCounter] = useState({
    correct: 0,
    incorrect: 0
  });
  const [finish, setFinish] = useState(false);

  useEffect(() => {

    if(counter.correct + counter.incorrect < 4){

      let numbersRandoms = [];

      do{
        const newRandomGenerate = generateRandom(initialCountries.length);

        if(!numbersRandoms.includes(newRandomGenerate)){
          numbersRandoms.push(newRandomGenerate)
        }

      }while(numbersRandoms.length <= 3)

      const countriesSelect = numbersRandoms.map(num => initialCountries[num]);
      setCountries(countriesSelect);
    }else{
      finishGame();
    }

  }, [counter])

  useEffect(() => {

    async function getCountryData(countrie){

      const res = await axios.get(`https://restcountries.com/v3.1/name/${countrie}`);
      const [data] = await res.data;
      const randomType = generateRandom(2);

      const unOrderCountries = [...countries];
      unOrderCountries.sort().reverse();

      const answers = [
        {
          option: 'A',
          name: unOrderCountries[0]
        },
        {
          option: 'B',
          name: unOrderCountries[1]
        },
        {
          option: 'C',
          name: unOrderCountries[2]
        },
        {
          option: 'D',
          name: unOrderCountries[3]
        }
      ];

      let title = answerType[randomType] === 'capital' ? `${data.capital[0]} is the capital of` : 'Which country does this flag belong to?';
      let flag = answerType[randomType] === 'capital' ? null : data.flags['png'];

      setQuestion((q) => {
        return {
          title,
          answers,
          flag,
          answerCorrect: data.name.common
        }
      })

    }

    if(countries.length > 0){
      getCountryData(countries[0]);
    }

  }, [countries])

  const nextOn = () => setNext(true);
  const nextOff = (result) => {
    handleCounter(result);
    setNext(false);
    setQuestion(initialQuestion);
    setCountries([]);
  };

  const handleCounter = (result) => {
      if(result){
        setCounter({
          ...counter,
          correct: counter.correct + 1
        })
      }else{
        setCounter({
          ...counter,
          incorrect: counter.incorrect + 1
        })
      }
  };

  const resetGame = () => {
    setCounter({
      correct: 0,
      incorrect: 0
    });
    setNext(false);
    setQuestion(initialQuestion);
    setCountries([]);
    setFinish(false);
  };

  const finishGame = () => {
    setFinish(true);
  }

  return {
    question,
    counter,
    next,
    nextOn,
    nextOff,
    resetGame,
    finish
  }

}

export default useQuestion