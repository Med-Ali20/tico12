import React, { useState, useEffect } from 'react'
import styles from './homepage.module.css'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import useSound from 'use-sound';
import music from '../../assets/music.mp3';
import { connect } from 'react-redux'


const Index = ( {isMusicPlayed, setPlayMusic} ) => {

  const [play] = useSound(music, {
    interrupt: false
  })


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


  const applyAnimation = (page) => {
    setAnimation(() => animations[`${page}Exit`])
    setTimeout(() => {
      navigate(`/${page}`, { replace: true })
      setAnimation(() => animations[`${page}Entrance`])
    }, 700)
  }

  const playSound = () => {
    if(!isMusicPlayed) {
      play()
    }
    setPlayMusic(true)
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
            <li> <button className={`${styles.navButton} ${styles.navButton1}`} onClick={() => {applyAnimation('pageOne'); playSound()}}  > ادارة الحاضنة </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton2}`} onClick={() => {applyAnimation('pageTwo'); playSound()}}  > اهداف الحاضنة  </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton3}`} onClick={() => {applyAnimation('pageThree'); playSound()}}  > الانشطة الجامعية </button> </li>
            <li> <button className={`${styles.navButton} ${styles.navButton4}`} onClick={() => {applyAnimation('pageFour'); playSound()}}  > الخدمات المقدمة </button> </li>
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
    isMusicPlayed: state.isMusicPlayed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayMusic: () => { dispatch({type: 'PLAY_MUSIC', payload: true}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)