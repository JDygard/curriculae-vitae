import styles from './GridBlock.module.css'

const GridBlock = (props) => {
    const gridClickHandler = (event) => {
        props.onGridClick(props.id)
    }

    let windowOff = "□";
    let windowOn = "■";

    return (
        <li className={styles.gridblock} onClick={gridClickHandler} id={props.id} style={{width: props.width + '%'}}>
            {props.on ? windowOn : windowOff}
        </li>
    )
}

export default GridBlock