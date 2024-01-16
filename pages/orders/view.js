import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../../components/data-grid';
import { useState } from 'react';
// import CreateAndEditPlace from '../../components/create-edit-place';
import CreateAndEditPlace from '../../components/create-edip-order';

const columns = [
  { field: 'orderDate', headerName: 'Order Date', type: 'date', width: 150 },
  { field: 'place', headerName: 'Place', width: 150, renderCell: (params) => params.row.place?.name },
  { field: 'totalCost', headerName: 'Total Cost', type: 'number', width: 150 },
  { field: 'totalPrice', headerName: 'Total Sale Price', type: 'number', width: 150 },
  { field: 'products', headerName: 'Products', width: 200, renderCell: (params) => params.row.products.map(item => `${item.name} (${item.quantity})`).join(', ') },
];

function OrdersView({onSubmit, onDelete, defaultValues, handleOpen, handleClose, open, orderData}) {
  const pageName = "Orders"
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
          data={orderData?.data?.map(item => { return { ...item, id: item._id } })}
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
export default OrdersView