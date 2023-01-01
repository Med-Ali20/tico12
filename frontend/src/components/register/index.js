import React from 'react'
import styles from './register.module.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import JobApplication from './jobApplication'
import JobOffer from './jobOffer'
import Default from './default'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('') 
  const [studyField, setStudyField] = useState('')
  const [skills, setSkills] = useState('')
  const [workField, setWorkField] = useState('')
  const [workType, setWorkType] = useState('')
  const [qualificationsRequired, setQualificationsRequired] = useState('')

  let navigate = useNavigate();
  const params = useParams()
  let payload = {}
  const title = params.title
  let dom = (<></>)

  if( title === 'بحث عن وظيفة' ) {
    payload = {
        applicantName: name,
        phoneNumber: phone,
        service: title,
        studyField: studyField,
        skills: skills
    }

    
    dom = (
        <JobApplication 
            name={name} 
            setName={setName}
            phone={phone}
            setPhone={setPhone} 
            studyField={studyField}
            setStudyField={setStudyField} 
            skills={skills}
            setSkills={setSkills} />)
    

} else if( title === 'عرض وظيفة' ) {
    payload = {
        applicantName: name,
        phoneNumber: phone,
        service: title,
        workField,
        qualificationsRequired,
        workType
    }

        
    dom = (
        <JobOffer 
        name={name} 
        setName={setName}
        phone={phone}
        setPhone={setPhone} 
        workField={workField}
        setWorkField={setWorkField} 
        qualificationsRequired={qualificationsRequired}
        setQualificationsRequired={setQualificationsRequired}
        workType={workType}
        setWorkType={setWorkType}
        />)
  }

  else {
    payload = {
        applicantName: name,
        phoneNumber: phone,
        service: title
    }

    dom = (
        <Default
        name={name} 
        setName={setName}
        phone={phone}
        setPhone={setPhone} 
         />
    )

  }

  const submitRegister = (e) => {
    e.preventDefault()
    axios.post('/Applicant/ApplyForAService', payload)
    .then(res => {
        navigate("/", { replace: true })
    })
  }

  return (
        <div  className={styles.registerPage}  >
            <div className={styles.register} >
                <h3 className={styles.registerText} >{title}</h3>
            </div>
            <form action="" className={styles.registerForm} onSubmit={submitRegister} >
                {dom}

                <input type="submit" value='تسجيل'  className={styles.registerCTA} />
            </form>
        </div>
    
  )
}

export default Register