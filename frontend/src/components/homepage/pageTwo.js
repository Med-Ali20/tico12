import React from 'react'
import styles from './pageTwo.module.css'
import flag from '../../assets/flag2.svg'


export default function pageTwo() {
  return (
    <div className={styles.pageTwo }>
      <h2 className={styles.header}> أهداف الحاضنة <img src={flag} className={styles.flag} alt="" /> </h2>
      <h3  className={styles.goal}>دعم الشركات الناشئة الصغيرة و المتوسطة و المتناهية الصغر </h3>
      <h3 className={styles.goal}> توفير الحماية الفكرية للإبتكارات و كذلك توفير الاستشارة و التوجيه للمتقدمين لبلورتها بأسلوب علمى </h3>
      <h3 className={styles.goal}> امداد المتقدمين بالرعاية و تبنى الأفكار التكنولوجية المبتكرة من قبل الخبراء و المفكرين فى مجال التخصص و المساعدة فى تسجيلها </h3>
      <h3 className={styles.goal}>توفير تجهيزات الحاسوب و خدمة الانترنت التى تساعد رواد الأعمال الناشئة و الصغيرة لتحويل خطط أعمالهم لنماذج أولية</h3>
      <h3 className={styles.goal}> خلق المزيد من فرص العمل مما يسهم فى رفع و تحسين مستوى المعيشة لتحويل خطط الأعمال و نماذج المنتجات الى أعمال ناجحة</h3>
    </div>
  )
}
