import React from 'react'
import styles from './pageOne.module.css'

export default function pageOne() {
  return (
    <div className={styles.pageOne} >
      <h1 className={styles.header} > الحاضنة التكنولوجية للمبتكرين </h1>
      <h3 className={styles.name} > المدير التنفيذي: <span>أ.د/ كريم محمد فرج</span></h3>
      <h3 className={styles.name}  > نائب المدير التنفيذي: <span>أ.د/ هناء مهدي ابو زيد</span></h3>
      <p className={styles.definition} ><span className={styles.definitionHeader} > الحاضنة التكنولوجية</span>
      هى المكان الذى يوفر البيئة المناسبة لمشروع وليد بغض النظرعن نوعه و احتضانه و رعايته و توفير الرعاية له و امداده بالطاقة و المساعدة بانواعها الممكنة لتحقيق فرصة الاستدامه و النجاح، و محاولة حل المشكلات للحماية من أى مخاطر و توفير الاحتياجات من عوامل النمو و التقوية لينهض و يستمر و يزدهر ، و المساعدة فى الحماية الفكرية للابتكار و التقدم للحصول على براءه اختراع من الجهات المختصة</p>
      <p className={styles.headquarter} ><span> المقر : </span>الدور السادس- مبنى كلية الزراعة بالأبعادية- الحاضنة التكنولوجية للمبتكرين </p>
      
    </div>
  )
}
