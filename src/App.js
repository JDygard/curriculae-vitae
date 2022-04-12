import './App.css';
import { useState, useRef } from 'react';

import GridSystem from './components/GridSystem'

const App = () => {
  var days = {
    0: [7, 11, 12, 13, 17],
    1: [0,1,3,4,5,7,9,11,12,13,15,17,19,20,21,23,24],
    2: [4, 8, 12, 16, 20],
    3: [6, 8, 10, 11, 13, 14, 16, 18],
    4: [5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19],
    5: [1, 2, 3, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 21, 22, 23],
    6: [2,5,6,7,9,11,12,14,15,16,17,19,22],
    7: [1,2,3,5,9,11,12,13,15,19,21,22,23],
    8: [0,4,6,7,8,11,12,13,16,17,18,20,24],
    9: [1,2,3,12,15,16,17,18,19,20,24],
    10: [2,6,8,10,14,20,22,24],
    11: [1,3,5,7,9,10,11,13,14,22],
    12: [7,12,22],
    13: [1,3,6,7,8,10,12,14,16,18,22],
  };

  // Check the browser cookies for the users current day
  var cookieValue;

  try {
    cookieValue = parseInt(document.cookie
      .split('; ')
      .find(row => row.startsWith('day='))
      .split('=')[1]);
  } catch {
    document.cookie = "day=0; SameSite=None; Secure";
    cookieValue = 0;
  };

  // Set the current day's puzzle
  const [currentLevel, setCurrentLevel] = useState(days[cookieValue]);

  // The method passed to GridBlock to lift the state
  const dayCompleteHandler = (event) => {
    if (event === "restart") {
      console.log("ost!")
      document.cookie = `day=0; SameSite=None; Secure`;
      setCurrentLevel(days[0]);
      return;
    }
    cookieValue = parseInt(document.cookie
      .split('; ')
      .find(row => row.startsWith('day='))
      .split('=')[1]);
    if (JSON.stringify(days[cookieValue + 1]) !== JSON.stringify(currentLevel)) {
      cookieValue += 1;
      document.cookie = `day=${cookieValue}; SameSite=None; Secure`;
      setCurrentLevel(days[cookieValue]);
    };
  };

  return (
    <div className="App-header">
      <div className="navBar">
        <div className='navLeft'>
          <h3 className="fadeIn">
            Day {cookieValue + 1}
          </h3>
        </div>
        <div className='navMid'>
          {cookieValue === 0 ? <h3 className="fadeIn">Turn off the lights</h3> : ""}
        </div>
        <div className='navRight'>
        </div>
      </div>
      <div className="middleRow">
        <div className="left"></div>
        <GridSystem squares="25" currentLevel={currentLevel} dayCompleteHandler={dayCompleteHandler} />
        <div className="right"></div>
      </div>
    </div>
  );
}

export default App;
