import React from 'react'
import styles from './register.module.css'

export default function jobApplication({name,setName, workField, setWorkField, qualificationsRequired, setQualificationsRequired, workType, setWorkType, phone, setPhone }) {
  return (
    <>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="name" value={name} onChange={e => {setName(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="name">:اسم الشركة</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="workField" value={workField} onChange={e => {setWorkField(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="workField">:مجال العمل</label>
        </div>
        <div className={styles.formGroup} >
            <textarea type="text" className={`${styles.textInput} ${styles.textarea}`} name="qualificationsRequired" value={qualificationsRequired} onChange={e => {setQualificationsRequired(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="qualificationsRequired">:المواصفات المطلوبة</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="workType" value={workType} onChange={e => {setWorkType(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="workType">:نوعية العمل</label>
        </div>
        <div className={styles.formGroup} >
            <input type="text" className={styles.textInput} name="phoneNumber" value={phone} onChange={e => {setPhone(e.target.value)}} />
            <label className={styles.registerLabel} htmlFor="phoneNumber">:الموبايل</label>
        </div>
    </>
  )
}
