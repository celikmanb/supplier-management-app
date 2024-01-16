import mongoose from 'mongoose'

const schema = mongoose.Schema;

const RoleSchema = new schema({
  id: String,
  role_name: String,
})

mongoose.models = {}
let role = mongoose.model('role', RoleSchema)

export default role
// module.exports = mongoose.models.ingriedient || mongoose.model('ingriedient', IngriedientSchema)