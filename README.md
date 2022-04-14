# "Lights Out!" - Dygard edition

**Live demo:** [Lights Out - Dygard Edition](https://lights-out-jdygard.herokuapp.com/)

***

[Lights Out](https://en.wikipedia.org/wiki/Lights_Out_(game)) was a handheld game system I owned as a child. I chose it to represent my skills in React on my portfolio because:

- It shows that I know how to manage state
- It is complex enough to show I can create something concise but robust
- It was a good learning experience to practice new skills

My design philosophy was to use only React, JSX and CSS to complete the game. No external visual elements or images were used.

# The software
## Components
The app consists of three components:

###  - App.js
Each level's puzzle is stored in the "days" array const as a simple instruction. When a user completes a level, the currentLevel state is updated to the new "day's" puzzle and passed as a prop to GridSystem.js.

Each user's "day" counter is stored in cookies, read and manipulated in App.js.

const dayCompleteHandler is passed as a prop to GridSystem.js to be used to restart or advance levels.

The background's visual features are built with JSX + CSS in App.js as well.
***
### - GridSystem.js

**Lines 10-38**

The grid system is built to be reusable and extensible. It can be passed any number of squares and will:

- Find out how to present them symmetrically
- Still be able to detect what grid squares it is adjacent to. 
- While the developer opted to be more concise, only another 12 lines of code could detect diagonal adjacency as well.

**Lines 40-51**

This is a callback function for the state, which checks if this is the end of the level. For efficiency, it goes through the gridSquares state (which is an array of boolean values representing the on/off state of each "window") and exits the check as soon as an active "window" is found.

A "newLevel" state is used to avoid recursion.

**Lines 53-78**
The adjustGridSquares function takes the onGridClickHandler data and compiles it into concise instructions to be passed into the setGridSquares state function.

**Lines 80-104**
The onGridClickHandler function takes the clicks detected by the JSX, detects the adjacent blocks and passes them all on to the adjustGridSquares function.

**Lines 106-127**
These three functions (resetHandler, restartHandler, and cancelHandler) handle the buttons below the game board, allowing the user to restart a level or start from level one. Clicking the "restart on Day 1" button gives the user the opportunity to cancel or proceed to lose progress.
***
### - GridBlock.js
This is a simple, stateless component for representing each square on the Grid. Clicking a square lifts its ID up to onGridClickHandler in GridSystem.js for processing.