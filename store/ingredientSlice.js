import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/status'
import httpClient from '../utils/httpClient'
import { createApiThunk } from '../utils/apiUtils'

const initialState = {
  ingredient: [],
  ingredientStatus: STATUS.IDLE,
  ingredientCount: 0,
  addProductItem: [],
  addProductStatus: STATUS.IDLE,
  editProductItem: [],
  editProductStatus: STATUS.IDLE,
  deleteProductItem: [],
  deleteProductStatus: STATUS.IDLE,
}

export const getIngredient = createApiThunk("getIngredient", "get", "/ingriedient");
export const postIngredient = createApiThunk("postIngredient", "post", "/ingriedient");
export const editIngredient = createApiThunk("editIngredient", "put", "/ingriedient/:id");
export const deleteIngredient = createApiThunk("deleteIngredient", "delete", "/ingriedient/:id");

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredient.pending, (state, action) => {
        state.ingredientStatus = STATUS.LOADING;
      })
      .addCase(getIngredient.fulfilled, (state, action) => {
        state.ingredientStatus = STATUS.SUCCESS;
        state.ingredient = action.payload;
      })
      .addCase(getIngredient.rejected, (state, action) => {
        state.ingredientStatus = STATUS.FAIL;
      })
      .addCase(postIngredient.pending, (state, action) => {
        state.addProductStatus = STATUS.LOADING;
      })
      .addCase(postIngredient.fulfilled, (state, action) => {
        state.addProductStatus = STATUS.SUCCESS;
        state.addProductItem = action.payload;
      })
      .addCase(postIngredient.rejected, (state, action) => {
        state.addProductStatus = STATUS.FAIL;
      })
      .addCase(editIngredient.pending, (state, action) => {
        state.editProductStatus = STATUS.LOADING;
      })
      .addCase(editIngredient.fulfilled, (state, action) => {
        state.editProductStatus = STATUS.SUCCESS;
        state.editProductItem = action.payload;
      })
      .addCase(editIngredient.rejected, (state, action) => {
        state.editProductStatus = STATUS.FAIL;
      })
      .addCase(deleteIngredient.pending, (state, action) => {
        state.deleteProductStatus = STATUS.LOADING;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.deleteProductStatus = STATUS.SUCCESS;
        state.deleteProductItem = action.payload;
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.deleteProductStatus = STATUS.FAIL;
      })
  }
})

export default ingredientSlice.reducer