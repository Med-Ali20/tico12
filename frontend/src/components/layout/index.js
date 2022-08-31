import React, { useState } from 'react'
import styles from './wrap.module.css'
import logo from '../../assets/logoUlt.png'
import gradHat from '../../assets/grad-hat.svg'
import book from '../../assets/book.svg'
import phone from '../../assets/phone.svg'
import questionMark from '../../assets/question-mark.svg'
import uniLogo from '../../assets/university-logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const wrapper = ({ children, token })=> {
    const [darkScreenStyle, setDarkScreenStyle] = useState({ display: 'none' })
    const [sideBarStyle, setSideBarStyle] = useState({transform: 'translateX(-100%)', transition: 'all 0.4s'})

    const toggleSideBar = () => {
        darkScreenStyle.display === 'none'? setDarkScreenStyle({display :'block'}) : setDarkScreenStyle({display :'none'})
        sideBarStyle.transform === 'translateX(-100%)' ? setSideBarStyle({...sideBarStyle,transform: 'translateX(0)'}): setSideBarStyle({...sideBarStyle, transform: 'translateX(-100%)'})
    }

    return(
        <div className={styles.wrapper} >
            <div className={styles.header} >
                <Link to='/pageOne' ><div className={styles.logoArea} >
                   <span> <img className={styles.logo} alt="" src={logo} /></span>
                </div></Link>
                
                <ul className={styles.burgerIcon} onClick={toggleSideBar} >
                    <li className={styles.burgerIconDash} ></li>
                    <li className={styles.burgerIconDash} ></li>
                    <li className={styles.burgerIconDash} ></li>
                </ul>
                <div className={styles.darkScreen} style={darkScreenStyle} onClick={toggleSideBar} ></div>
                <div className={styles.sideBar} style={sideBarStyle} >
                    <span className={styles.closeIcon} onClick={toggleSideBar} >X</span>
                    <ul className={styles.linkListSideBar} onClick={toggleSideBar} >
                        <li className={styles.link} >  <Link to='/child-university' >جامعة الطفل</Link></li>
                        <li className={styles.link} >  <Link to='/services' >دورات تعليمية</Link></li>
                        <li className={styles.link} >  {token ? <Link to='/dashboard' >Dashboard</Link>:<Link to='/jobApplication' >طريقك أخضر</Link>}</li>
                        <li className={styles.link} >  <Link to='/questions' >استفسارات</Link></li>
                    </ul>
                </div>
                
                <ul className={styles.linkList} >
                    <li className={styles.link} >  <span > <img src={gradHat} alt="" className={`${styles.linkIcon} ${styles.gradIcon}`} /> </span> <Link to='/child-university' >جامعة الطفل</Link></li>
                    <li className={styles.link} >  <span > <img src={book} alt="" className={`${styles.linkIcon} ${styles.bookIcon}`} />  </span> <Link to='/services' >دورات تعليمية</Link></li>
                    <li className={styles.link} >  <span > <img src={phone} alt="" className={`${styles.linkIcon} ${styles.phoneIcon}`} /> </span> {token ? <Link to='/dashboard' >Dashboard</Link>:<Link to='/jobApplication' >طريقك أخضر</Link>}</li>
                    <li className={styles.link} > <span ><img src={questionMark} alt="" className={`${styles.linkIcon} ${styles.questionMark}`} /></span> <Link to='/questions' >استفسارات</Link></li>
                </ul>
            </div>
            {children}
            <div className={styles.footer} >
                <span ><img src={uniLogo} alt="" className={styles.universityLogo} /></span>
                <p className={styles.uniLogoText} >جامعة <br/> دمنهور</p> 
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(wrapper)