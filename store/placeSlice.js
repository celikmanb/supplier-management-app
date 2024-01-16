import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/status'
import httpClient from '../utils/httpClient'
import { createApiThunk } from '../utils/apiUtils'

const initialState = {
  placeList: [],
  getPlaceStatus: STATUS.IDLE,
  placeCount: 0,
  addPlaceItem: [],
  addPlaceStatus: STATUS.IDLE,
  editPlaceItem: [],
  editPlaceStatus: STATUS.IDLE,
  deletePlaceItem: [],
  deletePlaceStatus: STATUS.IDLE,
}

export const getPlace = createApiThunk("getPlace", "get", "/place");
export const postPlace = createApiThunk("postPlace", "post", "/place");
export const editPlace = createApiThunk("editPlace", "put", "/place");
export const deletePlace = createApiThunk("deletePlace", "delete", "/place");


/* export const getPlace = createAsyncThunk("getPlace", async () => {
  const response = await httpClient.get("/place")
  return response.data
})

export const postPlace = createAsyncThunk("postPlace", async (data) => {
  const response = await httpClient.get("/place", data)
  return response.data
}) */

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPlace.pending, (state, action) => {
      state.getPlaceStatus = STATUS.LOADING
    })
    .addCase(getPlace.fulfilled, (state, action) => {
      state.getPlaceStatus = STATUS.SUCCESS
      state.placeList = action.payload
    })
    .addCase(getPlace.rejected, (state, action) => {
      state.getPlaceStatus = STATUS.FAIL
    })
    .addCase(postPlace.pending, (state, action) => {
      state.addPlaceStatus = STATUS.LOADING
    })
    .addCase(postPlace.fulfilled, (state, action) => {
      state.addPlaceStatus = STATUS.SUCCESS
      state.addPlaceItem = action.payload
    })
    .addCase(postPlace.rejected, (state, action) => {
      state.addPlaceStatus = STATUS.FAIL
    })
    .addCase(editPlace.pending, (state, action) => {
      state.editPlaceStatus = STATUS.LOADING
    })
    .addCase(editPlace.fulfilled, (state, action) => {
      state.editPlaceStatus = STATUS.SUCCESS
      state.editPlaceItem = action.payload
    })
    .addCase(editPlace.rejected, (state, action) => {
      state.editPlaceStatus = STATUS.FAIL
    })
    .addCase(deletePlace.pending, (state, action) => {
      state.deletePlaceStatus = STATUS.LOADING
    })
    .addCase(deletePlace.fulfilled, (state, action) => {
      state.deletePlaceStatus = STATUS.SUCCESS
      state.deletePlaceItem = action.payload
    })
    .addCase(deletePlace.rejected, (state, action) => {
      state.deletePlaceStatus = STATUS.FAIL
    })
  }
})

export default placeSlice.reducer