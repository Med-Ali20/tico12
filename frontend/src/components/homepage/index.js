import React, { useState, useEffect } from 'react'
import styles from './homepage.module.css'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'


const Index = ( {state} ) => {

  const [animation, setAnimation] = useState('')
  const animations =  {
    pageOneEntrance : styles['scale-in-tl'],
    pageOneExit : styles['scale-out-tl'],
    pageTwoEntrance : styles['slide-in-elliptic-left-fwd'],
    pageTwoExit : styles['slide-out-elliptic-left-bck'],
    pageThreeEntrance: styles['puff-in-center'],
    pageThreeExit: styles['puff-out-center'],
    pageFourEntrance: styles['rotate-in-ver'],
    pageFourExit: styles['rotate-out-ver']
  }

  const audio = new Audio('https://vocaroo.com/embed/1a07sEVRTevI?autoplay=0')

  const applyAnimation = (page) => {
    audio.play()
    setAnimation(() => animations[`${page}Exit`])
    setTimeout(() => {
      navigate(`/${page}`, { replace: true })
      setAnimation(() => animations[`${page}Entrance`])
    }, 700)
  }



  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/pageOne')
    }
    
  },[])
  
  return (
    <div className={styles.wrapper} >
        <div className={styles.innerWrapper} >
          <ul className={styles.navButtons} >
            <li> <button className={`${styles.navButton} ${styles.navButton1}`} onClick={() => applyAnimation('pageOne')}  > ادارة الحاضنة </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton2}`} onClick={() => applyAnimation('pageTwo')}  > اهداف الحاضنة  </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton3}`} onClick={() => applyAnimation('pageThree')}  > الانشطة الجامعية </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton4}`} onClick={() => applyAnimation('pageFour')}  > الخدمات المقدمة </button> </li>
          </ul>
          <div className={`${styles.container} ${animation}`} >
            <Outlet />
          </div>
          </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    state,
    }
}

export default connect(mapStateToProps)(Index)