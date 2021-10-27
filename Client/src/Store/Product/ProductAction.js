export const GET_PRODUCTLIST = "GET_PRODUCTLIST"
export const SET_PRODUCTLIST= "SET_PRODUCTLIST"


export function setProductList(ProductLists){

return{
    type:SET_PRODUCTLIST,
    ProductLists
    }   
}

export function getProductList(){
    return{
        type:GET_PRODUCTLIST,
     }
}