import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from '../utils/httpClient';

// Common utility function to create async thunks for API requests
export const createApiThunk = (requestType, method, url) => {
  try {
    console.log("method", method);
    return createAsyncThunk(
      requestType,
      async (data) => {
        const response = await httpClient[method](url, method == 'delete' || method == 'put' ? {params: data} : data);
        return response.data;
      }
    );
  } catch (error) {
    console.log("error util", error);
    return error
  }
};