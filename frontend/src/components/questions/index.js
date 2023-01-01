import React from 'react'
import styles from './questions.module.css'
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../utils/spinner'

const Index = ( { token } ) => {
    
    const [questions, setQuestions] = useState([])
    const [questionInput, setQuestionInput] = useState('')
    const [answerInput, setAnswerInput] = useState('')
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    let navigate = useNavigate()


    useEffect( () => {
        let abortController = new AbortController();  
        getQuestions()
        abortController.abort()
    } ,[])

    const getQuestions = () => {
        axios.get(`/Questions/questions?limit=10&skip=${skip}`)
        .then(res => {
            const data = res.data
            setQuestions(questions.concat(data))
            setSkip(skip +10)
            if(data.length === 0) {
                setHasMore(false)
            }
        })

    }

    const submitQuestion = (e) => {
        e.preventDefault()
        axios.post('/Questions/question', {
            question: questionInput
        })
        .then(res => {
            navigate("/", { replace: true })
        })
    }


    const submitAnswer = (e, id) => {
        e.preventDefault()
        axios.put('/Questions/question', {
            answer: answerInput,
            id,
            token
        })
        .then(res => {
            navigate("/", { replace: true })
        })
    }

    const deleteQuestion = (e, id) => {
        e.preventDefault()
        axios.delete('/Questions/question', {
            headers: {
                Authorization: token
            },
            data: {
                id
            }
        })
        .then(res => {
            navigate("/", { replace: true })
        })
    }

 

    const questionsDOM = questions.map( q => {
        if(token) {
            return (

                    <div className={styles.question} key={q._id} >
                        <h2 className={styles.questionText} >{q.question}</h2>
                            {q.answer ? <p className={styles.answer} > {q.answer} </p> : <></>}
                        
                        <div className={styles.formGroup} >
                            <textarea className={`${styles.textInput} ${styles.textarea} `} name="paragraph"  onChange={e => {setAnswerInput(e.target.value)}} />
                            <label className={styles.registerLabel} htmlFor="paragraph">اضافة اجابة</label>
                        </div>
                        <button className={styles.registerLink} onClick={(e) => {submitAnswer(e, q._id)}} >اضافة</button>
                        <button className={styles.registerLink} onClick={(e) => {deleteQuestion(e, q._id)}} style={{background: '#EE4B2B'}} >مسح السؤال</button>
                    </div>

            )
        }
        else {
            return (

                <div className={styles.question} key={q._id} >
                    <h2 className={styles.questionText} >{q.question}</h2>
                        {q.answer ? <p className={styles.answer} > {q.answer} </p> : <> </>}
                </div>

            )
        }
        
        
    })
    
    

    return (
            <div className={styles.questionPage} >
                <div className={styles.register} >
                    <h3 className={styles.registerText} >اسئلة و اجابة</h3>
                </div>
                <div className={styles.question} >
                    <div className={styles.formGroup} >
                        <textarea className={`${styles.textInput} ${styles.textarea} `} name="addQuestion"  value={questionInput} onChange={e => {setQuestionInput(e.target.value)}}  />
                        <label className={styles.registerLabel} htmlFor="addQuestion" >اضافة سؤال </label>
                    </div>
                    <button className={styles.registerLink} onClick={(e) => {submitQuestion(e)}} >اضافة</button>
                </div>
                <InfiniteScroll 
                className={styles.questions}
                dataLength={questions.length}
                next={getQuestions}
                loader={questions.length === 0 ? <></> : <div style={{margin: '2rem auto', background: 'var(--primary)',width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem'}} > <Spinner /> </div>}
                hasMore={hasMore} >.
                    {questions.length > 0 ? questionsDOM : <div style={{margin: '2rem auto', background: 'var(--primary)', display: 'flex', justifyContent: 'center', padding: '2rem'}} > <Spinner /> </div>  }
                    
                </InfiniteScroll>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps)(Index)