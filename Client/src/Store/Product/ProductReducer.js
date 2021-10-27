import { GET_PRODUCTLIST, SET_PRODUCTLIST } from "./ProductAction";

export const defaultProductlist = { ProductLists: null , loading : true };


function ProductReducer(state = defaultProductlist, action){
  console.log({ action });
  switch (action.type) {
    case GET_PRODUCTLIST:
      return {
        ...state,
        loading : true
      }
    case SET_PRODUCTLIST:
      return {
        ...state,
       ProductLists: action.ProductLists,
        loading : false
             };
    default:
      return state;
  }
}
export default ProductReducer;