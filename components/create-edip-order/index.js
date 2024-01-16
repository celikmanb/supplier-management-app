import * as React from 'react';
import { Button, Select, MenuItem, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect, useCallback } from 'react'; // Import hooks

function CreateAndEditPlace({ open, handleClose, formName, handleSubmit, defaultValues }) {
  const [formValues, setFormValues] = useState(defaultValues);


  const handleInputChange = (name, e) => {
    const { value } = e.target;
    console.log("input change ", value)

    if (name == "products") {

      const updatedFormValues = formValues.map(item => {
        let newQuantityValue = item.title === 'products' && item?.option?.filter(ing => value?.includes(ing._id))
        return item.title === 'products'
          ?
          {
            ...item,
            value: value,
            quantityValue: newQuantityValue.map(el => {
              let tempQuantity = item?.quantityValue?.find(x => x._id == el._id)?.quantity || "1"
              return {
                ...el,
                id: el._id,
                quantity: tempQuantity,
                totalPrice: parseFloat(tempQuantity * el.price)
              }
            }),
          } : item
      })

      setFormValues(updatedFormValues.map(item =>
        item.title === "totalCost" ? { ...item, value: calcSumTotalPrice(updatedFormValues.find(el => el.title == "products").quantityValue.map(x=>x.totalPrice)) } : item
      ));

    } else {
      const updatedFormValues = formValues.map(item => {
        if (item.title == "totalPrice" && item.title == name) {
          return {...item, value: parseFloat(value)}
        }
        return item.title === name ? { ...item, value: value } : item
      });

      setFormValues(updatedFormValues);
    }
  };

  const calcSumTotalPrice = (val) => {
    if (val.length == 0) return 0
    return val.reduce(function (a, b) {
      return a + b;
    });
  }

  const handleProductQuantityChange = (productId, e) => {
    const { value } = e.target;
    setFormValues(prevFormValues => {
      const updatedProducts = prevFormValues.find(item => item.title === 'products')?.quantityValue.map(product => {
        if (product.id === productId) {
          return { ...product, quantity: value, totalPrice: parseFloat(value*product.price) };
        }
        return product;
      });

      const updatedFormValues = prevFormValues.map(item => {
        if (item.title === 'products') {
          return { ...item, quantityValue: updatedProducts };
        }
        return item.title == "totalCost" ? {...item, value: calcSumTotalPrice(updatedProducts.map(el => el.totalPrice))} : item
      });

      return updatedFormValues;
    });
  };

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      handleSubmit(formValues);
    },
    [formValues, handleSubmit]
  );

  useEffect(() => {
    setFormValues(defaultValues);
  }, [defaultValues]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add {formName}</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {defaultValues &&
              defaultValues.map((item) => (
                <Grid item xs={12} key={item.title}>
                  {item && item?.field === 'select' ? (
                    <>
                      <InputLabel>{capitalizeFirstLetter(item.title)}</InputLabel>
                      {item?.title === 'products' ? (
                        <>
                          <Select
                            fullWidth
                            multiple
                            value={formValues.find((fv) => fv.title === item.title)?.value || []}
                            onChange={(e) => handleInputChange(item.title, e)}
                          >
                            {item?.option?.map((opt) => (
                              <MenuItem key={opt._id + opt.name} value={opt._id}>
                                {opt.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {formValues.find((fv) => fv.title === 'products')?.quantityValue?.map((product) => (
                            <div key={product?.id}>
                              {/* <InputLabel>{ingredient.name}</InputLabel> */}
                              <TextField
                                autoFocus
                                margin="dense"
                                label={`Quantity for ${product.name}`}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={product.quantity}
                                onChange={(e) => handleProductQuantityChange(product.id, e)}
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <Select
                          fullWidth
                          multiple={item.title == 'products'}
                          value={formValues.find((fv) => fv.title === item.title)?.value || []}
                          onChange={(e) => handleInputChange(item.title, e)}
                        >
                          {item?.option?.map((opt) => (
                            <MenuItem key={opt._id} value={opt._id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </>
                  ) : (
                    <TextField
                      disabled={item.title == "totalCost"}
                      autoFocus
                      margin="dense"
                      label={capitalizeFirstLetter(item.title)}
                      type="text"
                      fullWidth
                      variant="standard"
                      value={formValues.find((fv) => fv.title === item.title)?.value || ''}
                      onChange={(e) => handleInputChange(item.title, e)}
                    />
                  )}
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateAndEditPlace;