import React from 'react'
import styles from './card.module.css'


const card = (props) => {
    return (
        <div className= {styles.card}>
            <span  > <img className={styles.cardImage} width="370px" height="280px" src={props.image} alt="" /> </span>
            <div className={styles.cardDescription}>
                <p className={styles.cardDescriptionText} >{props.title}</p>
            </div>
        </div>
    )
}

export default card