import GridBlock from "./GridBlock";
import { useState, useEffect } from 'react';
import "./GridSystem.module.css";
import * as ReactDOM from 'react-dom';

const GridSystem = props => {
    const [gridSquares, setGridSquares] = useState([]);
    const [newLevel, setNewLevel] = useState(true)

    if (newLevel) {
        var init = [];

        for (let i = 0; i < props.squares; i++) {
            if (props.currentLevel.includes(i)) {
                let push = { id: `${i}`, on: true };
                init.push(push);
            } else {
                let push = { id: `${i}`, on: false };
                init.push(push);
            };
        };
        setGridSquares(init)
        setNewLevel(false)
    }

    // Figure out how many columns and rows fit the amount of blocks
    var columns = Math.round(Math.sqrt(props.squares));
    var excess = props.squares % columns;

    // Trim off any blocks that would break the symmetry
    if (excess !== 0) {
        for (let i = 0; i < excess; i++) {
            init.pop();
        };
    };
    // const rows = columns / (props.squares - excess)

    // Set the width prop to display different amounts of blocks appropriately
    var width = 100 / columns;

    const dayCompleteHandler = props.dayCompleteHandler;
    const gridCheck = gridSquares;

    useEffect(() => {
        for (let i = 0; i < gridCheck.length; i++) {
            if (gridCheck[i].on === true) {
                return
            };
        };
        setNewLevel(true)
        dayCompleteHandler(props.currentLevel);
    }, [dayCompleteHandler, props.currentLevel, gridCheck])

    const adjustGridSquares = keys => {
        // Collect the current state
        const updatedBlocks = gridSquares;
        let updateInstructions = [];

        // Create a pack of instructions to be passed into the setGridSquares method
        for (let i = 0; i < keys.length; i++) {
            let instruction;
            if (updatedBlocks[keys[i]].on) {
                instruction = { id: keys[i], on: false }
            } else {
                instruction = { id: keys[i], on: true }
            };
            updateInstructions.push(instruction);
        }

        // Pass instructions into the state
        setGridSquares(prevBlocks => {

            const updateBlocks = [...prevBlocks];
            for (let i = 0; i < updateInstructions.length; i++) {
                updateBlocks[updateInstructions[i].id].on = updateInstructions[i].on;
            };
            return updateBlocks;
        });
    };

    const onGridClickHandler = key => {
        // Test for adjacent squares

        // Test for horizontal adjacency
        let keyInt = parseInt(key);
        let affectedBlocks = [keyInt];
        let right = keyInt + 1;
        if (right % columns !== 0 && right <= gridSquares.length) {
            affectedBlocks.push(right);
        };
        let left = keyInt - 1;
        if ((left + 1) % columns !== 0 && left >= 0) {
            affectedBlocks.push(left);
        };
        // Test for vertical adjacency
        let above = keyInt - columns;
        if (above >= 0) {
            affectedBlocks.push(above);
        };
        let below = keyInt + columns
        if (below < gridSquares.length) {
            affectedBlocks.push(below);
        };
        adjustGridSquares(affectedBlocks);
    }

    const resetHandler = () => {
        setNewLevel(true)
    }

    const restartHandler = (event) => {
        cancelHandler()
        setNewLevel(true)
        dayCompleteHandler("restart")
    }

    const cancelHandler = () => {
        const element = (
            <div id="buttonsDiv">
                <button id="reset" onClick={resetHandler}>Restart this day</button>
                <button id="restart" onClick={restartButtonHandler}>Restart on Day 1</button>
            </div>
        )
        ReactDOM.render(
            element,
            document.getElementById("buttonsDiv")
        )
    }

    const restartButtonHandler = () => {
        const element = (
            <div id="buttonsDiv">
                <button id="reset" onClick={resetHandler}>Restart this day</button>
                <button id="restart" onClick={cancelHandler}>  Cancel the restart  </button>
                <button className="restartSlide" onClick={restartHandler}>Delete my progress</button>
            </div>
        )
        ReactDOM.render(
            element,
            document.getElementById("buttonsDiv")
        )
    }

    return (
        <ul className="">
            {gridSquares.map(item => (
                <GridBlock
                    key={item.id}
                    id={item.id}
                    width={width}
                    on={item.on}
                    onGridClick={onGridClickHandler}
                />
            ))}
            <div id="buttonsDiv">
                <button id="reset" onClick={resetHandler}>Restart this day</button>
                <button id="restart" onClick={restartButtonHandler}>Restart on Day 1</button>
            </div>
        </ul>
    );
};

export default GridSystem;