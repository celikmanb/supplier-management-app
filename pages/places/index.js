import { useDispatch, useSelector } from "react-redux"
import PlacesView from "./view"
import { getPlace, postPlace } from "../../store/placeSlice";
import { useEffect, useState } from "react";
import { openDeleteModal } from "../../store/modalSlice";
import { Box, CircularProgress } from "@mui/material";
import { STATUS } from "../../utils/status";

const defaultValues = [
  { title: "name", field: "text", value: "" },
]

function Places() {
  const dispatch = useDispatch()
  const { placeList, getPlaceStatus , addPlaceStatus, editPlaceStatus, deletePlaceStatus } = useSelector(state => state.places)

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    const placeData = {}
    values.forEach(element => {
      placeData[element.title] = element.value
    });
    await dispatch(postPlace(placeData))
    dispatch(getPlace())
  }

  const handleDelete = (value) => {
    dispatch(openDeleteModal({isOpen: true, deletedItem: value.row, message: value.row.name, type: "place" }))
  }

  useEffect(()=>{
    dispatch(getPlace())
  },[])

  return (<>
    {
      getPlaceStatus == STATUS.LOADING ||
      addPlaceStatus == STATUS.LOADING ||
      editPlaceStatus == STATUS.LOADING ||
      deletePlaceStatus == STATUS.LOADING ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box> :
      <PlacesView
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        defaultValues={defaultValues}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        placeData={placeList}
      ></PlacesView>
    }
  </>)
}

export default Places