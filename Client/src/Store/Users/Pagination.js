const PAGINATION_DATA = 'PAGINATION_DATA'   
export function pagination(userPages) {
 return{
    type: PAGINATION_DATA,
   payload: userPages
 }
}

const paginationspage = { userPages : []} 
function paginationReducer(state = paginationspage, action){
    console.log({ action });
    switch (action.type) {
      case PAGINATION_DATA:
        return {
                    ...state,
                userPages: [...state.userPages, action.payload],
               };
      default:
        return state;
    }
  }


export default paginationReducer;
