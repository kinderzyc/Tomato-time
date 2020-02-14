import {ADD_TOMATO,UPDATETOMATO,INIT_TOMATOES} from '../actionTypes';

export default (state:any[] = [],action) =>{
    switch(action.type){
        case ADD_TOMATO:
            return[action.payload,...state];
        case UPDATETOMATO:
                return state.map(t=>{
                    if(t.id === action.payload.id){
                         return action.payload
                    }else{
                        return t
                    }
                 })
              
        case INIT_TOMATOES:
            return[...action.payload]
            default:
                return state
    }
}