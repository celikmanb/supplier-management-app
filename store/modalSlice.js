import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "", // Silinecek öğe türü (örneğin, "product" veya "ingredient")
  deletedItem: null, // Silinecek öğenin ID'si
  type: ""
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.deletedItem = action.payload.deletedItem;
      state.type = action.payload.type;
    },
    closeDeleteModal: (state) => {
      state.isOpen = false;
      state.message = "";
      state.deletedItem = null;
      state.type = "";
    }
  }
})

export const { openDeleteModal, closeDeleteModal } = modalSlice.actions;
export default modalSlice.reducer