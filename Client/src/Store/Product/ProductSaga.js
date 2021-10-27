import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { GET_PRODUCTLIST, setProductList } from "./ProductAction";

function fetchProduct(){
return axios.get(`http://localhost:5000/api/products/products`)
.then(response=>response.data)
.catch((error)=>{
    console.log("object",error)
})
}

function* ProductList(action){
    const ProductData = yield call(fetchProduct)
    yield put(setProductList(ProductData))
}


function* DataProduct() {
    yield takeEvery(GET_PRODUCTLIST, ProductList);
  }
  

export default DataProduct;