import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { GET_PRODUCT_COUNT, setProdutCount } from "./ProductCountAction";

function fetchProductCount(){
return axios.get(`http://localhost:5000/api/products/productlist`)
.then(response=>response.data)
.catch((error)=>{
    console.log("object",error)
})
}

function* ProdutCount(action){
    const ProductData = yield call(fetchProductCount)
    yield put(setProdutCount(ProductData))
}


function* DataProductCount() {
    yield takeEvery(GET_PRODUCT_COUNT, ProdutCount);
  }
  

export default DataProductCount;