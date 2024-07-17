import React, { useState } from 'react';
import './App.css'; 

function App() {
  const init = Array(3).fill(null).map(() => Array(3).fill('white'));
  const [matrix, setMatrix] = useState(init);
  const [clicks, setClicks] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] !== 'white') return;

    const newMatrix = matrix.map((r, rowIndex) => 
      r.map((color, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return 'green';
        }
        return color;
      })
    );

    setMatrix(newMatrix);
    setClicks([...clicks, [row, col]]);

   
    const totalBoxes = 3 * 3;
    if (clicks.length + 1 === totalBoxes) {
      setTimeout(() => {
        changeColorsToOrange(clicks.concat([[row, col]]));
      }, 500);
    }
  };

  const changeColorsToOrange = (clicksOrder) => {
    clicksOrder.forEach(([row, col], index) => {
      setTimeout(() => {
        setMatrix(prevMatrix => {
          const newMatrix = prevMatrix.map(r => [...r]);
          newMatrix[row][col] = 'orange';
          return newMatrix;
        });
      }, index* 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
