import React from 'react'
import Card from '../utils/card'
import styles from './child-university.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../utils/spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const ChildUniversity = ({ dispatchTopics,storeTopics }) => {
    const [topics, setTopics] = useState([])
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(storeTopics.length > 0) {
            setTopics(storeTopics)
            setSkip(storeTopics.length)
        }
        else {
            let abortController = new AbortController();  
            getTopics()
            abortController.abort()

        }

       
    },[])

    const getTopics = () => {

        axios.get(`https://tico.onrender.com/Article/Articles/cu?limit=6&skip=${skip}`)
        .then(res => {
            const data = res.data
            setTopics(topics.concat(data))
            dispatchTopics(topics.concat(data))
            setSkip(skip +6)
            if(data.length === 0) {
                setHasMore(false)
                setError(true)
            }
            if(data.length === 0 && topics.length ===0 ) {
                setError(true)
            }
        })
        .catch(e => {
            console.log(e)
        })

    }

    const cards = topics.map(topic => { 
        return (<Link to={`/topic/${topic._id}`}  key={topic._id}  >
                    <Card image={topic.thumbnail}  title={topic.title} />
                </Link>)
     })

     const registerPanel = (
                <div className={styles.register} >
                    <h3 className={styles.registerText} >للتسجيل بجامعة الطفل</h3>
                    <span className={styles.registerLink} ><Link to='/register/جامعة الطفل' >اضغط هنا </Link></span>
                </div>
    )

    return (
                
             <InfiniteScroll
                className={styles.cuPage}
                dataLength={topics.length}
                next={getTopics}
                loader={topics.length === 0 ? <></> : <div style={{margin: '2rem auto', background: 'var(--primary)',width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem'}} > <Spinner /> </div>}
                hasMore={hasMore} >
                    {topics.length === 0 ? <></> : registerPanel}             
                    <div className={styles.cardsContainer} > 
                        { topics.length !== 0 ? cards : error? <h2 style={{textAlign: 'center', fontSize: '2rem', opacity:'0.7'}} >لا توجد مواضيع للعرض</h2> : <Spinner /> } 
                    </div>
            </InfiniteScroll>
    )
}



const mapStateToProps = state => {
    return {
        storeTopics: state.cuTopics
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatchTopics: (topics) => { dispatch({type: 'SET_TOPICS', payload: topics})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildUniversity)