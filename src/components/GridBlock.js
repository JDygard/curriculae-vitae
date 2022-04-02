import styles from './GridBlock.module.css'

const GridBlock = (props) => {
    const gridClickHandler = (event) => {
        props.onGridClick(props.id)
    }

    let window = "□"
    console.log(props)
    if (props.on) {
        window = "■"
    }

    return (
        <li className={styles.gridblock} onClick={gridClickHandler} id={props.id} style={{width: props.width + '%', fontSize: props.width / 3 + "rem"}}>
            {window}
        </li>
    )
}

export default GridBlock