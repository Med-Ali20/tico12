import React from 'react'
import styles from './addTopic.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../utils/spinner'


const addTopic = ({ token }) => {

    const [title, setTitle] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [images, setImages] = useState([])
    const [thumbnail, setThumbnail] = useState('')
    const [section, setSection] = useState('جامعة الطفل')
    const [applyingAllowed, setApplyingAllowed] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [loaderStyle, setLoaderStyle] = useState({})
    const [error, setError] = useState(false)

    let navigate = useNavigate()

    const submitForm = (e) => {
        e.preventDefault()

        if(title && paragraph && thumbnail ) {
            setError(false)
            const imgs = [...images]
            const fD = new FormData()
            fD.append('images', thumbnail)
            imgs.forEach(image => {
                fD.append('images', image)
            })
            fD.append('title', title)
            fD.append('paragraph', paragraph)
            fD.append('section', section)
            fD.append('applyingAllowed', applyingAllowed)
            fD.append('token', token)
            setBtnDisabled(true)
            setLoaderStyle({display: 'grid'})
            axios.post('/Article/AddArticle', fD)
            .then(res => {
                setLoaderStyle({display: 'none'})
                navigate("/", { replace: true })
                
            }).catch(e => {
                navigate("/", { replace: true })

            }) 
        }

        else {
            setError(true)
        }
        
       
    }

    

    return (
        <div className={styles.addTopicPage} >
            <div className={styles.loader} style={loaderStyle} > <Spinner /> </div>
            <form action="" onSubmit={submitForm} className={styles.registerForm} encType="multipart/form-data" >
                <div className={styles.formGroup} >
                    <select  className={styles.select} defaultValue={section} type="text" name="page" onChange={(e) => {setSection(e.target.value)}} >
                      <option value="جامعة الطفل" > جامعة الطفل </option>
                      <option value="خدمات الحاضنة" > دورات تعليمية</option>
                    </select>  
                    <label className={styles.registerLabel} htmlFor="page">الصفحة</label>
                </div>
                <div className={styles.formGroup} >
                    <input type="text" className={styles.textInput} name="name" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <label className={styles.registerLabel} htmlFor="name">اسم الموضوع</label>
                </div>
                <div className={styles.formGroup} >
                    <textarea className={`${styles.textInput} ${styles.textarea} `} name="paragraph" value={paragraph} onChange={(e) => {setParagraph(e.target.value)}} />
                    <label className={styles.registerLabel} htmlFor="paragraph">الفقرة</label>
                </div>
                <div className={styles.formGroup} >
                    <input type="file" className={styles.file} name="images" onChange={(e) => {setThumbnail(e.target.files[0])}} />
                    <label className={styles.registerLabel} htmlFor="file">صورة رئيسية</label>
                </div>
                <div className={styles.formGroup} >
                    <input type="file" className={styles.file} name="images" multiple  onChange={(e) => {setImages(e.target.files)}}  />
                    <label className={styles.registerLabel} htmlFor="file2">صور اضافية</label>
                </div>
                <div className={`${styles.formGroup} ${styles.chechGroup}`} >
                    <input type="checkbox" className={styles.check} name="check" value={applyingAllowed}  onChange={(e) => {setApplyingAllowed(e.target.checked)}}   />
                    <label className={styles.registerLabel} htmlFor="check">امكانية التسجيل</label>
                </div>
                
                {error? <p style ={{color:'red', textAlign: 'right', margin: '1rem auto'}} > برجاء ادخال البيانات كاملة </p> : <></>}
                <input type="submit" value='اضافة' className={styles.registerCTA} disabled={btnDisabled} />
            </form>
        </div>
    
  )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, null)(addTopic)