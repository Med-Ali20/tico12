import React from 'react'
import styles from './dashboard.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../utils/spinner'
import InfiniteScroll from 'react-infinite-scroll-component'


const Dashboard = ({ logout, token }) => {
    const [applicants, setApplicants] = useState([])
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
       let abortController = new AbortController();  
       getApplicants()
       abortController.abort()
    },[])

    const getApplicants = () => {
        axios.get(`https://tico.onrender.com/Applicant/applicants?limit=10&skip=${skip}`)
        .then(res => {
            const data = res.data
            setApplicants(applicants.concat(data))
            setSkip(skip +10)
            if(data.length === 0) {
                setHasMore(false)
            }
        })
    }

    const adminLogout = () => {
        logout()
        localStorage.setItem('token', '')
        navigate('/', { replace: true })

    }

    const deleteApplicant = (e, id) => {
        axios.delete(`https://tico.onrender.com/Applicant/applicant/${id}`, {
            headers :{
                Authorization: token
            },
            data: {
                id
            }
        }).then(() => {
            navigate(0, {replace: true})
        })
        .catch(e => {

            navigate('/', { replace: true })

        })
    }

    const data = applicants.map(applicant => {

        if(applicant.service === 'عرض وظيفة'){
            return (
                <div className={styles.applicantsDataText} key={applicant._id} >
                    <p className={styles.applicantName} >:الخدمة <span>  {applicant.service} </span> </p>
                    <p className={styles.applicantName} >:اسم الشركة <span>  {applicant.applicantName} </span> </p>
                    <p className={styles.applicantName} >:مجال العمل <span>  {applicant.workField} </span> </p>
                    <p className={styles.applicantName} >:المواصفات المطلوبة<span>  {applicant.qualificationsRequired} </span> </p>
                    <p className={styles.applicantName} >:نوعية العمل العمل <span>  {applicant.workType} </span> </p>
                    <p className={styles.applicantName} >:الموبايل <span> {applicant.phoneNumber} </span> </p>
                    <button className={styles.registerLink} onClick={(e) => {deleteApplicant(e, applicant._id)}} style={{background: '#EE4B2B'}} >مسح </button>

                </div>
    
            )
        } else if(applicant.service === 'بحث عن وظيفة'){
            return (
                <div className={styles.applicantsDataText} key={applicant._id} >
                    <p className={styles.applicantName} >:الخدمة <span>  {applicant.service} </span> </p>
                    <p className={styles.applicantName} >:اسم الخريج <span>  {applicant.applicantName} </span> </p>
                    <p className={styles.applicantName} >:مجال الدراسة <span>  {applicant.studyField} </span> </p>
                    <p className={styles.applicantName} >:المهارات<span>  {applicant.skills} </span> </p>
                    <p className={styles.applicantName} >:الموبايل <span> {applicant.phoneNumber} </span> </p>
                    <button className={styles.registerLink} onClick={(e) => {deleteApplicant(e, applicant._id)}} style={{background: '#EE4B2B'}} >مسح </button>
                </div>
            )
        }

        else 
            return (
                <>
                    <div className={styles.applicantsDataText} key={applicant._id} >
                        <p className={styles.applicantName} >:الخدمة <span>  {applicant.service} </span> </p>
                        <p className={styles.applicantName} >:الاسم <span> {applicant.applicantName} </span> </p>
                        <p className={styles.applicantName} >:الموبايل <span> {applicant.phoneNumber} </span> </p>
                        <button className={styles.registerLink} onClick={(e) => {deleteApplicant(e, applicant._id)}} style={{background: '#EE4B2B'}} >مسح </button>

                    </div>
                </>
            )
    })

    return (
            <div className={styles.dashboardPage} >
                <Link to='/addTopic' className={styles.addTopic}> اضافة موضوع</Link>
                <button className={`${styles.addTopic} ${styles.logout} `} onClick={adminLogout} > تسجيل الخروج </button>
                <div className={styles.applicantsData} >
                    <InfiniteScroll
                    dataLength={applicants.length}
                    next={getApplicants}
                    loader={applicants.length === 0 ? <></> : <div style={{margin: '2rem auto', background: 'var(--primary)',width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem'}} > <Spinner /> </div>}
                    hasMore={hasMore}
                    > 
    
                            {data.length > 0 ? data : <div style={{background: 'var(--primary)', width: '100%', display: 'grid', placeContent: 'center', height: '4rem'}} > <Spinner /> </div>}
                        
                    </InfiniteScroll>
                </div>
                
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
        logout: () => { dispatch({type: 'LOGOUT'}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)