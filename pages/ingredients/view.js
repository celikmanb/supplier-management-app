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
  { field: 'unit', headerName: 'Unit' },
  { field: 'unit_price', headerName: 'Unit Price' },
  { field: 'quantity', headerName: 'Quantity' },
];

function IngredientsView({ onSubmit, onDelete, defaultValues, ingredientData, open = false, handleOpen, handleClose }) {
  const pageName = "Ingredients" // get pageNames from utils or constants not type static
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
    onDelete(rowValues)
  }

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#0b1929', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Divider></Divider>
        <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleOpen}>Add {pageName}</Button>
        <Divider style={{ marginBottom: '2%' }}></Divider>
        <DataTable
          data={ingredientData?.data?.map(item => { return { ...item, id: item._id } })}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
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
export default IngredientsView