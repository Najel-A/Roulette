import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import './Roulette.css'

// https://github.com/effectussoftware/react-custom-roulette
// Using this npm package


const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: '28', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '26', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '30', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '11', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '20', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '32', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '17', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '22', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '34', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '15', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '24', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '36', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '13', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '00', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: '27', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '25', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '29', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '12', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '19', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '31', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '18', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '6', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '21', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '33', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '16', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '4', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '23', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '35', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '14', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '2', style: { backgroundColor: 'black', textColor: 'white' } }
];

const RouletteWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [array, setArray] = useState([]); // Last 20 numbers spinned
  const [blackCounter, setBlackCounter] = useState(0);
  const [redCounter, setRedCounter] = useState(0);
  const [greenCounter, setGreenCounter] = useState(0);
  const [seconds, setSeconds] = useState(15);

  // Figure out stats here, will be off since starting with a fake data set
  const blackOptions = data.filter(item => item.style.backgroundColor === 'black').map(item => item.option);
  const redOptions = data.filter(item => item.style.backgroundColor === 'red').map(item => item.option);
  const greenOptions = data.filter(item => item.style.backgroundColor === 'green').map(item => item.option);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else {
        
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Will have to have this configured in the backend later on
  useEffect(() => {
    if (!isSpinning) {
      const selectedOption = data.find((item, index) => index === prizeNumber);
      console.log("selectred option",selectedOption);
      totalSpins++;
      if (selectedOption) {
        setArray(prevArray => [...prevArray, selectedOption.option]);
      }

      // Color Probability
      if (blackOptions.includes(selectedOption.option)){
        setBlackCounter(prevCount => prevCount + 1);
      }
      if (redOptions.includes(selectedOption.option)){
        setRedCounter(prevCount => prevCount + 1);
      }
      if (greenOptions.includes(selectedOption.option)){
        setGreenCounter(prevCount => prevCount + 1);
      }
      console.log("Black Prob:", blackCounter);
      //console.log("Red Prob:")

    }
  }, [isSpinning, prizeNumber]);
  if (array.length == 2 && array[0] === '0' && array[1] === '0'){
    array.splice(0,2);
  }
  console.log(array)

  var totalSpins = blackCounter + redCounter + greenCounter;
  const blackProbability = totalSpins >= 0 ? (blackCounter / array.length) * 100 : 0;
  const redProbability = totalSpins >= 0 ? (redCounter / array.length) * 100 : 0;
  const greenProbability = totalSpins >= 0 ? (greenCounter / array.length) * 100 : 0;
  // const greenProbability = totalSpins > 0 ? (greenCounter / array.length) * 100 : 0;

  console.log(blackProbability);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setIsSpinning(true);
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setIsSpinning(false);
    //setSeconds(Math.floor(Math.random() * 30));
  };

  return (
    <>
      <h1>Timer: {seconds} seconds</h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={onStopSpinning}
        innerRadius={25}
        disableInitialAnimation={true}
        outerBorderColor='black'
        outerBorderWidth={15}
        innerBorderColor='black'
        innerBorderWidth={15}
        perpendicularText={true}
        fontSize={15}
        radiusLineWidth={3}
        radiusLineColor='#FFFFFF'
      />
      <button onClick={handleSpinClick} style={{ display: 'block', margin: '0 auto' }}>SPIN</button>
      <h1>Black Probability: {blackProbability.toFixed(2)}%</h1>
      <h1>Red Probability: {redProbability.toFixed(2)}%</h1>
      <h1>Green Probability: {greenProbability.toFixed(2)}%</h1>
      <h1>Numbers</h1>
      <ul>
        {/* Map over the array and render each element
            Temporary fix for the useEffect creating two indexes
         */}
        {array.reverse().map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>

    </>
  );
};


export default RouletteWheel;
