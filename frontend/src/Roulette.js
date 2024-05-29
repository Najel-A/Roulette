import React, { useState, useEffect } from 'react';
import './Roulette.css';

const Roulette = () => {
  const [spinResult, setSpinResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [maskText, setMaskText] = useState('Place Your Bets');
  const [previousResults, setPreviousResults] = useState([]);
  const redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  const timer = 9000;

  useEffect(() => {
    const numbers = document.querySelectorAll('.number');
    const total = 37; // Assuming there are 37 numbers (0 to 36)
    const rotateDeg = 360 / total;

    numbers.forEach((number, index) => {
      number.style.transform = `rotateZ(${rotateDeg * index}deg)`;
    });
  }, []);

  const handleSpin = () => {
    const randomNumber = Math.floor(Math.random() * 37); // inclusive of 0 to 36
    setSpinResult(randomNumber);
    setIsSpinning(true);

    setTimeout(() => {
      setMaskText('No More Bets');
    }, timer / 2);

    setTimeout(() => {
      setMaskText('Place Your Bets');
    }, timer + 500);

    setTimeout(() => {
      setIsSpinning(false);
      const color = randomNumber === 0 ? 'green' : redNumbers.includes(randomNumber) ? 'red' : 'black';
      setPreviousResults([{ number: randomNumber, color }, ...previousResults]);
    }, timer);
  };

  const handleReset = () => {
    setSpinResult(null);
    setIsSpinning(false);
    setIsResetting(true);
    setTimeout(() => setIsResetting(false), 500);
  };

  return (
    <div className="main">
      <button type="button" className="btn" onClick={handleSpin} disabled={isSpinning}> 
        <span className="btn-label">Spin</span>
      </button>
      <button type="button" className="btn btn-reset" onClick={handleReset} disabled={isSpinning}>
        <span className="btn-label">New Game</span>
      </button> 
      <div className={`plate ${isSpinning ? 'spinning' : ''}`}>
        <ul className="inner" data-spinto={spinResult}>
          {Array.from({ length: 37 }).map((_, i) => (
            <li key={i} className="number">
              <label>
                <input type="radio" name="pit" value={i} />
                <span className="pit">{i}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="data">
          <div className="data-inner">
            <div className="mask">{maskText}</div>
            <div className="result">
              <div className="result-number">{spinResult !== null ? spinResult : '00'}</div>
              <div className="result-color">
                {spinResult === 0 ? 'green' : redNumbers.includes(spinResult) ? 'red' : 'black'}
              </div>        
            </div>
          </div>
        </div>
      </div>
      <div className="previous-results">
        <ol className="previous-list">
          {previousResults.length === 0 && <li className='visuallyhidden placeholder'>No results yet.</li>}
          {previousResults.map((result, index) => (
            <li key={index} className={`previous-result color-${result.color}`}>
              <span className="previous-number">{result.number}</span>
              <span className="previous-color">{result.color}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Roulette;
