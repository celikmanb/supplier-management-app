import { useDispatch, useSelector } from "react-redux"
import ProductsView from "./view"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getIngredient } from "../../store/ingredientSlice";
import { getProduct, postProduct } from "../../store/productSlice";
import { Box, CircularProgress } from "@mui/material";
import { STATUS } from "../../utils/status";

const defaultValues = [
  {title: "name", field: "text", value: ""},
  {title: "ingredients", field: "select", option: [], value: []},
  {title: "price", field: "text", value: ""},
  {title: "quantity", field: "text", value: ""},
]

function Products() {
  const dispatch = useDispatch()
  const { ingredient } = useSelector(state => state.ingredients)
  const { 
    getProductList,
    postProductItem,
    getProductStatus,
    postProductStatus,
    editProductStatus,
    deleteProductStatus
  } = useSelector(state => state.products)
  
  let initialValue = defaultValues.map(item => {
    if (item.title == "ingredients") {
      item.option = ingredient?.data
    }
    return item
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    const productData = {};
    values.forEach(element => {
      productData[element.title] = element.title == 'ingredients' ? element.quantityValue : element.value;
    });
    console.log("product Data", productData)
    await dispatch(postProduct(productData));
    dispatch(getProduct())
  }
  useEffect(()=>{
    dispatch(getIngredient());
    dispatch(getProduct())
  },[])

  const handleDelete = (value) => {
    console.log("vale", value)
    dispatch(openDeleteModal({isOpen: true, deletedItem: value.row, message: value.row.name, type: "product" }))
  }

  const productList = useMemo(() => {
    return getProductList?.data?.map(item => {
      return {
        ...item, 
        ingredientsName: ingredient?.data?.filter(el => item.ingriedient?.includes(el._id))?.map(e => e.name).join(', '), // Güncellenen kısım
      }
    })
  }, [getProductList]);

  return (<>
    {
      getProductStatus == STATUS.LOADING ||
      postProductStatus == STATUS.LOADING ||
      editProductStatus == STATUS.LOADING ||
      deleteProductStatus == STATUS.LOADING ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
      <ProductsView
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        defaultValues={initialValue}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        productData={productList}
      >
      </ProductsView>
    }
  </>)
}

export default Products