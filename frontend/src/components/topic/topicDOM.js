import React, { useState, useEffect } from 'react'
import styles from './topic.module.css'
import { Link,  useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function TopicDOM( { topic, date, token } ) {
    
    const [dimenstions, setDimentions] = useState({width: '800px', height: '600px'})
    const [galleryState, setGalleryState] = useState({display: 'none'})
    const [imageIndex, setImageIndex] = useState(0)
    const topicId = topic._id
    let navigate = useNavigate()



    useEffect(() => {
        
        if(parseInt(window.screen.availWidth) <= 414) {
            setDimentions({width: '400px', height: '300px'})
        }
        else {
            setDimentions({width: '800px', height: '600px'})
        }
    },[])

    const deleteTopic = () => {
        axios.delete(`/Article/Article`, {
            headers: {
                Authorization: token
            },
            data:{id: topicId}
        })
        navigate('/', { replace: true })
        navigate(0)

    }

    const changeGalleryImage = (direction, array) => {
        if(direction === 'right' && imageIndex < array.length - 1) {
            setImageIndex(prevState => {
                return prevState +1
            })
        }

        if(direction === 'left' && imageIndex > 0) {
            setImageIndex(prevState => {
                return prevState -1
            })
    } }

    const showGallery = (index) => {
        setImageIndex(index)
        parseInt(window.screen.availWidth) > 414 ? setGalleryState({display: 'flex'}) : setGalleryState({display: 'none'})
    }

    
    const photos = topic ? topic.images.map(img => {
        return(
            <span className={styles.topicPhoto} key={Math.random()*10000} onClick={() => showGallery(topic.images.findIndex((i) => i === img)) }> <img src={img} width="400px" height="300px" alt="" /> </span>
        )
    }): (<></>)

    const galleryDOM = ( topic.images.length > 0 ?
        <div className={styles.gallery} style={galleryState} > 
        <span className={styles.leftArrow} onClick={() => changeGalleryImage('left', topic.images)} ></span> 
        <img src={topic.images[imageIndex]} width="800px" height="600px" alt="" /> 
        <span className={styles.rightArrow}onClick={() => changeGalleryImage('right', topic.images)} ></span>
        <span className={styles.close} onClick={() => setGalleryState({display: 'none'})} >X</span>    

    </div> : <></> 
    )

        
    return (
        
        <>
            { galleryDOM }
           
            <div className={styles.topicHeader} >
                <h1 className={styles.topicHeaderText} >{topic.title}</h1>
                    <p className={styles.date} > { `${date.getDate()} / ${date.getMonth() +1} / ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}` } </p>
                </div>
                <div className={styles.thumbnail} > <img src={topic.thumbnail} width={dimenstions.width} height={dimenstions.height} alt="" /> </div>
                <div className={styles.topicBody} >
                    <p className={styles.topicParagraph} >
                        {topic.paragraph}
                        {topic.applyingAllowed ? <Link to={`/register/${topic.title}`} className={styles.registerLink}  > التسجيل الان </Link> : <></>}
                        {token ? <button className={styles.registerLink} onClick={deleteTopic} style={{cursor: 'pointer', border: 'none', fontFamily: 'Cairo', background: 'red'}} >مسح الموضوع</button>: ''}
                    </p>
                    <div className={styles.topicPhotos} >
                        {topic.images.length >0 ? photos : <></>}
                    </div>
                </div>
        </>
    )
}
