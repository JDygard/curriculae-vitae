import './App.css';
import { useState, useRef } from 'react';

import GridSystem from './components/GridSystem'

const App = () => {
  var days = {
    0: [7, 11, 12, 13, 17],
    1: [4, 8, 12, 16, 20],
    2: [6, 8, 10, 11, 13, 14, 16, 18],
    3: [5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19],
    4: [1, 2, 3, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 21, 22, 23],
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
