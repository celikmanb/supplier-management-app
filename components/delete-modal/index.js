import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { closeDeleteModal } from '../../store/modalSlice'
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient } from '../../store/ingredientSlice'
import { deletePlace } from '../../store/placeSlice';
import { deleteOrder } from '../../store/orderSlice';
import { deleteProduct } from '../../store/productSlice';



function DeleteModal({isOpen}) {
  const dispatch = useDispatch()
  const {message, type, deletedItem} = useSelector(state => state.modals)

  const handleClose = () => {
    dispatch(closeDeleteModal())
  };

  const submitDelete = async () => {
    if(type == "place") {
      console.log("burada")
      await dispatch(deletePlace({id: deletedItem.id}))
    }else if(type == "product") {
      await dispatch(deleteProduct({id: deletedItem.id}))
    }else if(type == "order") {
      await dispatch(deleteOrder({id: deletedItem.id}))
    }else if(type == "ingredient") {
      await dispatch(deleteIngredient({id: deletedItem.id}))
    }else {
      return
    }
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {message} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;