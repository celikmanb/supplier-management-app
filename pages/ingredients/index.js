import * as React from 'react';
import IngredientsView from "./view"
import { useState } from 'react';
import { getIngredient, postIngredient } from '../../store/ingredientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Box, CircularProgress } from "@mui/material";
import { STATUS } from "../../utils/status";

const defaultValues = [
  {title: "name", field: "text", value: ""},
  {title: "unit", field: "select", option: ["gram", "piece"], value: []},
  {title: "unit_price", field: "text", value: ""},
  {title: "quantity", field: "text", value: ""},
]

function Ingredients() {
  const dispatch = useDispatch()
  const {
      addProductItem,
      ingredient, 
      ingredientStatus,
      addProductStatus,
      editProductStatus,
      deleteProductStatus
    } = useSelector(state => state.ingredients)
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    const ingredientData = {};
    values.forEach(element => {
      ingredientData[element.title] = element.title == "unit" ? element.value.join() : element.value;
    });
    await dispatch(postIngredient(ingredientData));
    dispatch(getIngredient());
  }

  const handleDelete = (value) => {
    dispatch(openDeleteModal({isOpen: true, deletedItem: value.row, message: value.row.name, type: "ingredient" }))
  }

  useEffect(()=>{
    dispatch(getIngredient());
  },[])
  
  return (<>
    {
      ingredientStatus == STATUS.LOADING ||
      addProductStatus == STATUS.LOADING ||
      editProductStatus == STATUS.LOADING ||
      deleteProductStatus == STATUS.LOADING ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
      <IngredientsView
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        defaultValues={defaultValues}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        ingredientData={ingredient}
      >
      </IngredientsView>
    }
  </>)
}

export default Ingredients