import mongoose from 'mongoose'

const schema = mongoose.Schema;

const IngriedientSchema = new schema({
  id: String,
  name: String,
  unit: String,
  unit_price: String,
  quantity: Number,
  isDeleted: { type: Boolean, defaults: false }
})

mongoose.models = {}
let ingriedient = mongoose.model('ingriedient', IngriedientSchema)

export default ingriedient
// module.exports = mongoose.models.ingriedient || mongoose.model('ingriedient', IngriedientSchema)