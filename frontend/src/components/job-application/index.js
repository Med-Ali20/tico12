import React from 'react'
import styles from './job-application.module.css'
import { Link } from 'react-router-dom'
import search from '../../assets/search.svg'
import manager from '../../assets/manager.svg'

export default function Index() {
  return (
    <div className={styles.page} >
        <Link className={styles.section} to="/register/عرض فرصة"><div className={styles.businessman} > <img src={manager} className={styles.icon} alt='' /> <h1 className={styles.header} > عرض فرصة</h1></div></Link>
        <Link className={styles.section} to="/register/بحث عن فرصة" ><div className={styles.applicant} >  <img src={search} className={styles.icon} alt='' /> <h1 className={styles.header} > بحث عن فرصة</h1> </div></Link>
    </div>
  )
}
