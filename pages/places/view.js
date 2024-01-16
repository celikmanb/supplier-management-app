import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../components/data-grid';
import CreateAndEditPlace from '../../components/create-edit-place';
import { useState } from 'react';

const columns = [
  { field: 'name', headerName: 'Name' },
]

function PlacesView({ onSubmit, onDelete, defaultValues, open = false, handleOpen, handleClose, placeData }) {
  const pageName = "Places"

  const [modalValue, setModalValue] = useState(defaultValues)
  const handleEdit = (rowValues) => { 
    let changedValue = defaultValues.map((item) => 
      ({ ...item, value: rowValues.row[item.title] })
    )
    setModalValue(changedValue)
    handleOpen()
    // iterate then fill up
    // open modal and set edit type
    // after than controlling type and submitted
  };
  const handleDelete = (rowValues) => {
    // dispatch(openDeleteModal({isOpen: true, message: rowValues.row.name}))
    onDelete(rowValues)
  }

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#0b1929', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Places
        </Typography>
        <Divider></Divider>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleOpen}>Add {pageName}</Button>
        <Divider style={{ marginBottom: '2%' }}></Divider>
        <DataTable
          data={placeData?.data?.map(item => { return { ...item, id: item._id } })}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        >
        </DataTable>
      </Box>
      <CreateAndEditPlace
        open={open}
        handleClose={handleClose}
        formName={pageName}
        handleSubmit={onSubmit}
        defaultValues={modalValue}
      />
    </Container>
  )
}
export default PlacesView