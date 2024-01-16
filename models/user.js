import mongoose from 'mongoose'

const schema = mongoose.Schema;

const UserSchema = new schema({
  id: String,
  username: String,
  password: String,
  email: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role',
  },
  isDeleted: { type: Boolean, defaults: false }
})

mongoose.models = {}
let user = mongoose.model('user', UserSchema)

export default user
// module.exports = mongoose.models.ingriedient || mongoose.model('ingriedient', IngriedientSchema)