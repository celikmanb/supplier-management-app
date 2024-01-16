import mongoose from 'mongoose'

const schema = mongoose.Schema;

const ProductSchema = new schema({
  id: String,
  name: String,
  price: String,
  quantity: Number,
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingriedient',
      },
      quantity: String,
    },
  ],
  isDeleted: { type: Boolean, defaults: false }
})
mongoose.models = {}
let product = mongoose.model('product', ProductSchema)

// module.exports = mongoose.model('product', ProductSchema)
export default product
// mongoose.models.ProductSchema ||