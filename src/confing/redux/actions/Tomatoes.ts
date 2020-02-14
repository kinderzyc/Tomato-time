import { INIT_TOMATOES,ADD_TOMATO ,UPDATETOMATO} from '../actionTypes';

export const addTomato = (payload:any) =>{
    return{
        type: ADD_TOMATO,
        payload
    }
}

export const initTomatoes = (payload:any[]) =>{
    return{
        type: INIT_TOMATOES,
        payload
    }
}
export const updateTomato = (payload:any[]) =>{
    return{
        type: UPDATETOMATO,
        payload
    }
}