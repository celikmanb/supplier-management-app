import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/status'
import { createApiThunk } from '../utils/apiUtils'

const initialState = {
  user: {},
  token: '',
  status: STATUS.IDLE,
}