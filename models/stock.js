import mongoose from 'mongoose'

const schema = mongoose.Schema

const stockSchema = new schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ingriedient'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  quantity: Number
});
mongoose.models = {}
let stock = mongoose.model('stock', stockSchema)

export default stock