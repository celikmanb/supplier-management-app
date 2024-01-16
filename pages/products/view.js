import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../components/data-grid';
import { useState } from 'react';
import CreateAndEditPlace from '../../components/create-edit-place';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'price', headerName: 'Price' },
  { field: 'ingredientsName', headerName: 'Ingriedient' },
  { field: 'quantity', headerName: 'Quantity' },
]

function ProductsView({ onSubmit, onDelete, defaultValues, productData, open = false, handleOpen, handleClose }) {
  const pageName = "Products"
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
  /* const handleEdit = (rowValues) => { 
    let changedValue = defaultValues.map((item) => 
      ({ ...item, value: rowValues.row[item.title] })
    );
  
    // Ingredients'ları id formatında alın
    const selectedIngredients = rowValues.row.ingriedient.map(ingredient => ingredient._id);
  
    // Düzenlenen ürünün ingredient idsini defaultValues içerisine ekleyin
    changedValue.find(item => item.title === 'ingredients').value = selectedIngredients;
  
    setModalValue(changedValue);
    handleOpen();
  }; */

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
          data={productData?.map(item => { return { ...item, id: item._id } })}
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
export default ProductsView