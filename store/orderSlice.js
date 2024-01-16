import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { createApiThunk } from '../utils/apiUtils'

const initialState = {
  orderList: [],
  getOrderStatus: STATUS.IDLE,
  postOrderItem: [],
  postOrderStatus: STATUS.IDLE,
  orderCount: 0,
  editOrderItem: [],
  editOrderStatus: STATUS.IDLE,
  deleteOrderItem: [],
  deleteOrderStatus: STATUS.IDLE, 
}

export const getOrder = createApiThunk("getOrder", "get", "/order")
export const postOrder = createApiThunk("postOrder", "post", "/order")
export const editOrder = createApiThunk("editOrder", "put", "/order/:id");
export const deleteOrder = createApiThunk("deleteOrder", "delete", "/order/:id");

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getOrder.pending, (state, action) => {
      state.getOrderStatus = STATUS.LOADING
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      state.getOrderStatus = STATUS.SUCCESS
      state.orderList = action.payload
    })
    .addCase(getOrder.rejected, (state, action) => {
      state.getOrderStatus = STATUS.FAIL
    })
    .addCase(postOrder.pending, (state, action) => {
      state.postOrderStatus = STATUS.LOADING
    })
    .addCase(postOrder.fulfilled, (state, action) => {
      state.postOrderStatus = STATUS.SUCCESS
      state.postOrderItem = action.payload
    })
    .addCase(postOrder.rejected, (state, action) => {
      state.postOrderStatus = STATUS.FAIL
    })
    .addCase(editOrder.pending, (state, action) => {
      state.editOrderStatus = STATUS.LOADING
    })
    .addCase(editOrder.fulfilled, (state, action) => {
      state.editOrderStatus = STATUS.SUCCESS
      state.editOrderItem = action.payload
    })
    .addCase(editOrder.rejected, (state, action) => {
      state.editOrderStatus = STATUS.FAIL
    })
    .addCase(deleteOrder.pending, (state, action) => {
      state.deleteOrderStatus = STATUS.LOADING
    })
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.deleteOrderStatus = STATUS.SUCCESS
      state.deleteOrderItem = action.payload
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.deleteOrderStatus = STATUS.FAIL
    })
  }
})

export default orderSlice.reducer