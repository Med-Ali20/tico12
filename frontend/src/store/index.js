import { createStore } from 'redux'

const initialState = {
    cuTopics: [],
    servicesTopics: [],
    topic: '',
    token: localStorage.token || '',
}

export const store = createStore((state = initialState, action) => {
    switch(action.type){
        case 'SET_TOPICS':
            return {
                ...state,
                cuTopics: action.payload
            }
            
        case 'SET_TOPICS_SERVICES': 
            return {
                ...state,
                servicesTopics: action.payload
            }
        case  'LOGIN': 
            return {
                ...state, 
                token: action.payload,
            }
        case  'LOGOUT': 
            return {
                ...state, 
                token: '',
            }
        case 'SET_TOPIC': 
            return {
                ...state,
                topic: action.payload
            }
        default:
             return state
    }
}) 