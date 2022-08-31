import React from 'react'
import styles from './register.module.css'

export default function jobApplication({name,setName, studyField,  setStudyField, skills, setSkills, phone, setPhone }) {
  return (
    <>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="name" value={name} onChange={e => {setName(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="name">:اسم الخريج</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="studyField" value={studyField} onChange={e => {setStudyField(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="studyField">:مجال الدراسة</label>
        </div>
        <div className={styles.formGroup} >
            <textarea type="text" className={`${styles.textInput} ${styles.textarea}`} name="skills" value={skills} onChange={e => {setSkills(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="skills">:المهارات</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="phoneNumber" value={phone} onChange={e => {setPhone(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="phoneNumber">:الموبايل</label>
        </div>
    </>
  )
}
