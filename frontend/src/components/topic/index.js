import React, {useState, useEffect} from 'react'
import styles from './topic.module.css'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../utils/spinner'
import TopicDOM from './topicDOM'

const Topic = ({ token, storeTopic, dispatchTopic }) => {
    const [topic, setTopic] = useState('')
    const [date, setDate] = useState({})
    const { id } = useParams()    
    


    useEffect(()=> {
        if(storeTopic._id === id) { 
            setTopic(storeTopic)
            setDate(new Date(storeTopic.createdAt))
        }
        else {
            getTopic()
        }

    },[])

    const getTopic = () => {
        let abortController = new AbortController();  

        axios.get(`https://tico.onrender.com/Article/Article/${id}`)
        .then(res => {
            setTopic(res.data)
            dispatchTopic(res.data)
            setDate(new Date(res.data.createdAt))
        })

        abortController.abort()

    }

    



    const topicDOM = topic ? (<>
        <TopicDOM topic={topic} date={date} token={token}  />
    </>) : <Spinner />

  return (
    <>
        <div className={styles.topicPage} >

            {topicDOM}
        </div>
        
    </>
  )
}

const mapStateToProps = state => {
    return {
        storeTopic: state.topic,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchTopic: (topic) => { dispatch({type: 'SET_TOPIC', payload: topic}) },

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Topic)