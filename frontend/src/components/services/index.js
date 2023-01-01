import React from 'react'
import Card from '../utils/card'
import styles from '../child-university/child-university.module.css'
import { useEffect, useState,} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import imgProcessor from '../utils/imgProcessor'
import { Link } from 'react-router-dom'
import Spinner from '../utils/spinner'
import InfiniteScroll from 'react-infinite-scroll-component'


const Services = ({ dispatchTopics, storeTopics }) => {
    const [topics, setTopics] = useState([])
    const [skip, setSkip] = useState(0)
    const [hasMore, setHasMore] = useState(true)

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
        axios.get(`/Article/Articles/services?limit=6&skip=${skip}`)
        .then(res => {
            const data = res.data
            setTopics(topics.concat(data))
            dispatchTopics(topics.concat(data))
            setSkip(skip +6)
            if(data.length === 0) {
                setHasMore(false)
            }
        })

    }
   

    const cards = topics.map(topic => { 
        return (<Link to={`/topic/${topic._id}`}  key={topic._id}  >
                    <Card image={topic.thumbnail}  title={topic.title} />
                </Link>)
     })

    return (
            <InfiniteScroll
                className={styles.cuPage}
                dataLength={topics.length}
                next={getTopics}
                loader={topics.length === 0 ? <></> : <div style={{margin: '2rem auto', background: 'var(--primary)',width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem'}} > <Spinner /> </div>}
                hasMore={hasMore} >             
                    <div className={styles.cardsContainer} > 
                        { topics.length !== 0 ? cards : <Spinner />} 
                    </div>
            </InfiniteScroll>
    )
}

const mapStateToProps = state => {
    return {
        storeTopics: state.servicesTopics
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchTopics: (topics) => { dispatch({type: 'SET_TOPICS_SERVICES', payload: topics})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)