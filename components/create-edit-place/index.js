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

    if (name === 'ingredients') {
      const updatedFormValues = formValues.map(item => {
        let newQuantityValue = item.title === 'ingredients' && item?.option?.filter(ing => value?.includes(ing._id))
        console.log("new quantity", newQuantityValue)
        return item.title === 'ingredients' 
        ? 
        { 
          ...item,
          value: value,
          quantityValue: newQuantityValue.map(el => { 
            return { 
              ...el,
              id: el._id,
              quantity: item?.quantityValue?.find(x => x._id == el._id)?.quantity || "" } }) 
        } : item
      });
      setFormValues(updatedFormValues);
    }else if (name == "products") {
      let isSelectedProductsPrice = ""

      const updatedFormValues = formValues.map(item =>{
        if (item.title == name && value.length > 0) {
          let priceOfSelectedProducts = item?.option?.filter(el => value?.includes(el._id)).map(x => parseFloat(x.price))
          isSelectedProductsPrice = calcSumTotalPrice(priceOfSelectedProducts)
        }
        return item.title === name ? { ...item, value: value } : item
      });
      setFormValues(updatedFormValues.map(item => item.title === "totalCost" ? { ...item, value: isSelectedProductsPrice } : item));
    } else {
      const updatedFormValues = formValues.map(item =>{
        return item.title === name ? { ...item, value: value } : item
      });

      setFormValues(updatedFormValues);
    }
  };

  const calcSumTotalPrice = (val) => {
    console.log("price", val)
    if (val.length == 0) return 0
    return val.reduce(function(a, b){
      return a + b;
    });
  }

  const handleIngredientQuantityChange = (ingredientId, e) => {
    const { value } = e.target;
    setFormValues(prevFormValues => {
      const updatedIngredients = prevFormValues.find(item => item.title === 'ingredients')?.quantityValue.map(ingredient => {
        if (ingredient.id === ingredientId) {
          return { ...ingredient, quantity: value };
        }
        return ingredient;
      });

      const updatedFormValues = prevFormValues.map(item => {
        if (item.title === 'ingredients') {
          return { ...item, quantityValue: updatedIngredients };
        }
        return item;
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
                      {item?.title === 'ingredients' ? (
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
                          {formValues.find((fv) => fv.title === 'ingredients')?.quantityValue?.map((ingredient) => (
                            <div key={ingredient?.id}>
                              {/* <InputLabel>{ingredient.name}</InputLabel> */}
                              <TextField
                                autoFocus
                                margin="dense"
                                label={`Quantity for ${ingredient.name}`}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientQuantityChange(ingredient.id, e)}
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