import {GET_PRODUCT_COUNT,SET_PRODUCT_COUNT} from'./ProductCountAction'

const defualtCountProduct = {ProductCount : null,loading : true}

export function CountProductReducer(state=defualtCountProduct,action){
   switch(action.type)
   {
       case GET_PRODUCT_COUNT:{
           return{
               ...state,
           }
       }
       case SET_PRODUCT_COUNT:{
          return{ ...state,
           ProductCount : action.ProductCount,
           loading:false
          }
        }
        default : {
            return state
        }
   }
}

export default CountProductReducer;