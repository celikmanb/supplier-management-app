import { useDispatch, useSelector } from "react-redux"
import OrdersView from "./view"
import { getOrder, postOrder } from "../../store/orderSlice"
import { useEffect, useState } from "react";
import { editProduct, getProduct } from "../../store/productSlice";
import { getPlace } from "../../store/placeSlice";
import { Box, CircularProgress } from "@mui/material";
import { STATUS } from "../../utils/status";

const defaultValues = [
  { title: "place", field: "select", option: [], value: [] },
  { title: "orderDate", field: "date", value: new Date() },
  { title: "totalCost", field: "text", value: 0 },
  { title: "totalPrice", field: "text", value: 0 },
  { title: "products", field: "select", option: [], value: [] },
];

function Orders() {
  const dispatch = useDispatch()
  const { orderList } = useSelector(state => state.orders)
  const { placeList } = useSelector(state => state.places)
  const { 
    getProductList,
    getOrderStatus,
    postOrderStatus,
    editOrderStatus,
    deleteOrderStatus
  } = useSelector(state => state.products)
  
  let initialValue = defaultValues.map(item => {
    if (item.title == "products") {
      item.option = getProductList?.data
    }
    if (item.title == "place") {
      item.option = placeList?.data
    }
    return item
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    const orderData = {};
    values.forEach(element => {
      orderData[element.title] = element.title == 'products' ? element.quantityValue : element.value;
    });
    orderData.place = placeList?.data.find(item => orderData.place == item?._id)
    console.log("order data", orderData)
    console.log("place data", placeList)
    console.log("product data", getProductList)
    let newOrder = await dispatch(postOrder(orderData));
    console.log("new order", newOrder);
    if (newOrder?.payload?.success) {
      console.log("deneme 23");
      getProductList?.data.map(async (item) => {
        let existProduct = orderData.products.find(el => el._id == item._id)
        if (existProduct) {
          console.log("deneme 32");
          let payload = {
            ...item,
            quantity: parseFloat(item.quantity - existProduct.quantity)
          }
          let temp2 = await dispatch(editProduct(payload))
          console.log("temp2", temp2);
        }
      })
    }
    dispatch(getOrder())
    handleClose()
  }

  const handleDelete = (value) => {
    dispatch(openDeleteModal({isOpen: true, deletedItem: value.row, message: value.row.name, type: "order" }))
  }

  useEffect(()=>{
    dispatch(getProduct())
    dispatch(getPlace())
    dispatch(getOrder())
  },[])

  // console.log("order list", orderList)

  return (<>
  {
    getOrderStatus == STATUS.LOADING ||
    postOrderStatus == STATUS.LOADING ||
    editOrderStatus == STATUS.LOADING ||
    deleteOrderStatus == STATUS.LOADING ?
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> :
    <OrdersView
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      defaultValues={initialValue}
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      orderData={orderList}
    >
    </OrdersView>
  }
  </>)
}

export default Orders