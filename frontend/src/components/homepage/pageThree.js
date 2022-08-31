import React from 'react'
import styles from './pageThree.module.css'
import gradHat from '../../assets/gradHat.svg'


export default function pageThree() {
  return (
    <div className={styles.pageThree} >
      <h2 className={styles.header} >الانشطة الجامعية  <img src={gradHat} className={styles.gradHat} alt="" /> </h2>
      <h3 className={styles.goal} >رفع قدرات الطلاب</h3>
      <h3 className={styles.goal} >ننظيم الندوات لزيادة قدرات و مفاهيم الطلاب و الطالبات</h3>
      <h3 className={styles.goal} >التعاون مع الجهات المحيطة لزيادة فهم الطلاب بكيفية عمل و ادارة المشروع الصغير و المتوسط و المتناهي الصغر</h3>
      <h3 className={styles.goal} >تنظيم دورات تدريبية لطلاب الجامعة لتعلم اللغات و المهارات اليدوية</h3>
    </div>
  )
}
