import React, { useState, useEffect } from 'react'
import styles from './register.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Admin = ({ setToken, token }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      if(token) {
        navigate('/dashboard')
      }
    }, [token])

    const adminLogin = (e) => {
      e.preventDefault()
      axios.post('/Admin/sign-in', {
        adminName: name,
        password
      }).then(res => {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard', { replace: true })
      }).catch(e => {
        setError('خطأ في تسجيل الدخول')
      })
    }

  return (
    <div className={styles.registerPage} style={{marginTop: '10rem'}} >
        <form action="" className={styles.registerForm} onSubmit={adminLogin} >
          <div className={styles.formGroup} >
              <input type="text" className={styles.textInput} name="name" value={name} onChange={e => {setName(e.target.value)}} />
              <label className={styles.registerLabel} htmlFor="name">:الاسم</label>
          </div>
          <div className={styles.formGroup} >
              <input type="password" className={styles.textInput} name="password" value={password} onChange={e => {setPassword(e.target.value)}} />
              <label className={styles.registerLabel} htmlFor="password">:كلمة السر</label>
          </div>
          <p style={{color: 'red', textAlign: 'right', marginRight: '1rem'}} >{error}</p>
          <input type="submit" value="تسجيل الدخول" className={styles.registerCTA} />
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: (token) =>  { dispatch({type: 'LOGIN', payload: token}) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin)