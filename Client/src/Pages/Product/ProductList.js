import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { getProductList } from "../../Store/Product/ProductAction";
var valueGetter = (params) => params.row._id
const columns = [
  { field: "id", headerName: "ID", width: 90, valueGetter },
  { field: "productName", headerName: "Product Name", width: 230 },
  { field: "productPrice", headerName: "Product Price", width: 230 },
  //   { field: "productImage", headerName: "Product Image", width: 90, },
  {
    field: "productDescription",
    headerName: "Product Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
];

export default function DataTable() {
  const product = useSelector(state => state?.ProductReducer?.ProductLists || null)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getProductList())
  
    setLoading(false)
        // axios
    //   .get("http://localhost:5000/api/products/products")
    //   .then((res) => {
    //     setProduct(res.data.map((p) => ({...p, id: p._id}))
    //     );
    //     setLoading(false)
    //   })
    //   .catch((err) => {
    //     console.log("errorrr");
    //   });
  }, []);

 

  return (
    <div style={{ height: 400, width: "100%" }}>
      {loading ? <h1>Loading...</h1> : product && <DataGrid
        rows={product.map((p) => ({...p, id:p._id}))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      /> }
    </div>
  );
}
