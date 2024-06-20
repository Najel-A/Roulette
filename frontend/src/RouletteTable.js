import React, { useState } from 'react';
import './RouletteTable.css';

const numbers = [
  { value: '0', color: 'green' },
  { value: '28', color: 'black' }, { value: '9', color: 'red' }, { value: '26', color: 'black' }, { value: '30', color: 'red' },
  { value: '11', color: 'black' }, { value: '7', color: 'red' }, { value: '20', color: 'black' }, { value: '32', color: 'red' },
  { value: '17', color: 'black' }, { value: '5', color: 'red' }, { value: '22', color: 'black' }, { value: '34', color: 'red' },
  { value: '15', color: 'black' }, { value: '3', color: 'red' }, { value: '24', color: 'black' }, { value: '36', color: 'red' },
  { value: '13', color: 'black' }, { value: '1', color: 'red' }, { value: '00', color: 'green' }, { value: '27', color: 'red' },
  { value: '10', color: 'black' }, { value: '25', color: 'red' }, { value: '29', color: 'black' }, { value: '12', color: 'red' },
  { value: '8', color: 'black' }, { value: '19', color: 'red' }, { value: '31', color: 'black' }, { value: '18', color: 'red' },
  { value: '6', color: 'black' }, { value: '21', color: 'red' }, { value: '33', color: 'black' }, { value: '16', color: 'red' },
  { value: '4', color: 'black' }, { value: '23', color: 'red' }, { value: '35', color: 'black' }, { value: '14', color: 'red' },
  { value: '2', color: 'black' },
];

const RouletteTable = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div className="roulette-table">
      <div className="number-grid">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`number ${number.color} ${selectedNumber === number.value ? 'selected' : ''}`}
            onClick={() => handleNumberClick(number.value)}
          >
            {number.value}
          </div>
        ))}
      </div>
      <div className="selected-number">
        {selectedNumber !== null ? <p>Selected Number: {selectedNumber}</p> : <p>No Number Selected</p>}
      </div>
    </div>
  );
};

export default RouletteTable;
