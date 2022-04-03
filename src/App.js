import './App.css';
import { useState } from 'react';

import GridSystem from './components/GridSystem'

const App = () => {
  var days = {
    "day0": [7, 11, 12, 13, 17],
    "day1": [4, 8, 12, 16, 20],
    "day2": [6, 8, 10, 11, 13, 14, 16, 18],
    "day3": [5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19],
    "day4": [1, 2, 3, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 21, 22, 23],
  };
  const [currentLevel, setCurrentLevel] = useState(days["day0"]);

  const dayCompleteHandler = () => {
    console.log("hello")
    var cookieValue
    try {
      cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('day='))
        .split('=')[1];
    } catch {
      document.cookie = "day=0; SameSite=None; Secure";
      cookieValue = 0;
    }
    setCurrentLevel(days[`day${cookieValue}`])
  }
  // Get the day cookie
  // cookie += 1

  // Levels are kept as modification instructions for the base gameboard

  // Current level is stored in the state
  return (
    <div className="App-header">
      <GridSystem squares="25" currentLevel={currentLevel} dayCompleteHandler={dayCompleteHandler} />
    </div>
  );
}

export default App;
