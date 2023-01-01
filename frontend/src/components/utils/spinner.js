import React from 'react'
import loadingSpinner from '../../assets/spinner.png'
import styles from './spinner.module.css'

const Spinner = () => {
  return (
    <img src={loadingSpinner} className={styles.spinner} alt="loading spinner" />
  )
}

export default Spinner
