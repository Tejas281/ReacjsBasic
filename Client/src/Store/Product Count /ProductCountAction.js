export const GET_PRODUCT_COUNT = 'GET_PRODUCT_COUNT'
export const SET_PRODUCT_COUNT = 'SET_PRODUCT_COUNT'


export function getProductCount(){
        return{
            type:GET_PRODUCT_COUNT,
        }
}

export function setProdutCount(ProductCount){
      return{
          type:SET_PRODUCT_COUNT,
          ProductCount
      }
}