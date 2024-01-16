import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "./ingredientSlice";
import productSlice from './productSlice';
import placeSlice from "./placeSlice";
import orderSlice from "./orderSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientSlice,
    products: productSlice,
    places: placeSlice,
    orders: orderSlice,
    modals: modalSlice
  }
})