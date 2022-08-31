import React from 'react'
import styles from './pageFour.module.css'
import gear from '../../assets/gear.svg'


export default function pageFour() {
  return (
    <div className={styles.pageFour} >
      <h2 className={styles.header} >الخدمات المقدمة <img src={gear} className={styles.gear} alt="" /> </h2>
      <div className={styles.container} >
        <div>
          <h3 className={styles.goal} >الخدمات المقدمة و الخاصة بالحماية الفكرية و التكنولوجية</h3>
          <h3 className={styles.goal} >مساعدة المبتكرين في تخطيط و ادارة و تنفيذ مشروعاتهم المبتكرة</h3>
          <h3 className={styles.goal} >ملء نماذج التقدم للتسجيل للحصول على براءة اختراع سواء باللغة العربية او الانجليزية</h3>
          <h3 className={styles.goal} >تقديم النصح و المشورة فيما يخص الانشطة المبتكرة للعمل بالطريقة الملائمة</h3>
        </div>
        <div>
          <h3 className={styles.goal} >الخدمات الخاصة برفع كفاءة المهتمين باجراء الاعمال</h3>
          <h3 className={styles.goal} >رفع كفاءة المهتمين باجراء الاعمال و الصناعات اليدوية و الحرفية</h3>
          <h3 className={styles.goal} >دعم الفدرات التكنولوجية للطلاب و الطالبات سواء من خلال الدورات البرمجية او الحماية الالكترونية من التداخل السلبي على موافع الكمبيوتر</h3>
        </div>
        <div>
          <h3 className={styles.goal} >الخدمات المقدمة و الخاصة بالحماية الفكرية و التكنولوجية</h3>
          <h3 className={styles.goal} >تحكيم المعارض و المسابقات الابتكارية داخل و خارج الجامعة</h3>
          <h3 className={styles.goal} >تنظيم معارض للشركات و المواد الزراعية المستحدثة في نطاق الحرم الجامعي</h3>
        </div>
      </div>
      </div>
  )
      
}
