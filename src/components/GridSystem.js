import GridBlock from "./GridBlock";
import { useState } from 'react';
import styles from "./GridSystem.module.css";

const GridSystem = props => {
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

    const [gridSquares, setGridSquares] = useState(init);

    const checkDayComplete = data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].on === true) {
                props.dayCompleteHandler()
                return
            };
        };
    };
    
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

        checkDayComplete(gridSquares)
    };

    const onGridClickHandler = key => {
        // Test for adjacent squares
        // Test for horizontal adjacency
        let keyInt = parseInt(key);
        let affectedBlocks = [keyInt];
        let right = keyInt + 1;
        if (right % columns !== 0 && right <= init.length) {
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
        if (below < init.length) {
            affectedBlocks.push(below);
        };
        adjustGridSquares(affectedBlocks);
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
        </ul>
    );
};

export default GridSystem;