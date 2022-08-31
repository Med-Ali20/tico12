import React from 'react'
import styles from './register.module.css'

export default function jobApplication({name,setName,phone, setPhone }) {
  return (
    <>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="name" value={name} onChange={e => {setName(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="name">:الاسم</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="phoneNumber" value={phone} onChange={e => {setPhone(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="phoneNumber">:الموبايل</label>
        </div>
    </>
  )
}
