import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import './Roulette.css'

// https://github.com/effectussoftware/react-custom-roulette
// Using this npm package


const data = [
  { option: '0', style: { backgroundColor: 'green', textColor: 'white' } },
  { option: '32', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '15', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '19', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '4', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '21', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '2', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '25', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '17', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '34', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '6', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '27', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '13', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '36', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '11', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '30', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '23', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '24', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '16', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '33', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '20', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '14', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '31', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '22', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '18', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '29', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '28', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '12', style: { backgroundColor: 'red', textColor: 'white' } },
  { option: '35', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
];



const RouletteWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (!isSpinning) {
      const selectedOption = data.find((item, index) => index === prizeNumber);
      if (selectedOption) {
        setArray(prevArray => [...prevArray, selectedOption.option]);
        console.log("Selected Option:", selectedOption);
      }
    }
  }, [isSpinning, prizeNumber]);

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
  };

  return (
    <>
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
      <h1>Numbers</h1>
      <ul>
        {/* Map over the array and render each element */}
        {array.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>

    </>
  );
};


export default RouletteWheel;
