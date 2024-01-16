import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { createApiThunk } from '../utils/apiUtils'

const initialState = {
  getProductList: [],
  getProductStatus: STATUS.IDLE,
  postProductItem:[],
  postProductStatus : STATUS.IDLE,
  productCount: 0,
  
  editProductItem:[],
  editProductStatus : STATUS.IDLE,

  deleteProductItem:[],
  deleteProductStatus : STATUS.IDLE,
  
}

/* export const getProduct = createAsyncThunk("getProduct", async() => {
  const response = await httpClient.get("/product")
  return response.data
})

export const postProduct = createAsyncThunk("postProduct", async(req) => {
  const response = await httpClient.post("/product", req)
  return response.data
}) */

export const getProduct = createApiThunk("getProduct", "get", "/product");
export const postProduct = createApiThunk("postProduct", "post", "/product");
export const editProduct = createApiThunk("editProduct", "put", "/product/:id");
export const deleteProduct = createApiThunk("deleteProduct", "delete", "/product/:id");

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProduct.pending, (state, action) => {
      state.getProductStatus = STATUS.LOADING
    })
    .addCase(getProduct.fulfilled, (state, action) => {
      state.getProductStatus = STATUS.SUCCESS
      state.getProductList = action.payload
    })
    .addCase(getProduct.rejected, (state, action) => {
      state.getProductStatus = STATUS.FAIL
    })
    .addCase(postProduct.pending, (state, action) => {
      state.postProductStatus = STATUS.LOADING
    })
    .addCase(postProduct.fulfilled, (state, action) => {
      state.postProductStatus = STATUS.SUCCESS
      state.postProductItem = action.payload
    })
    .addCase(postProduct.rejected, (state, action) => {
      state.postProductStatus = STATUS.FAIL
    })
    .addCase(editProduct.pending, (state, action) => {
      state.editProductStatus = STATUS.LOADING
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      state.editProductStatus = STATUS.SUCCESS
      state.editProductItem = action.payload
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.editProductStatus = STATUS.FAIL
    })
    .addCase(deleteProduct.pending, (state, action) => {
      state.deleteProductStatus = STATUS.LOADING
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductStatus = STATUS.SUCCESS
      state.deleteProductItem = action.payload
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.deleteProductStatus = STATUS.FAIL
    })
  }
})

export default productSlice.reducer