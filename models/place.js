import mongoose from 'mongoose'

const schema = mongoose.Schema;

const PlaceSchema = new schema({
  id: String,
  name: String,
  isDeleted: { type: Boolean, defaults: false }
})

mongoose.models = {}
let place = mongoose.model('place', PlaceSchema)

export default place
// module.exports = mongoose.models.ingriedient || mongoose.model('ingriedient', IngriedientSchema)