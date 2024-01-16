import { createRouter } from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import product from '../../../models/product'

const router = createRouter()

router.use(async (req, res, next) => {
  const start = Date.now();
  await next(); // call next in chain
  const end = Date.now();
  console.log(`Request took ${end - start}ms`);
})

router.get(async (req, res) => {
  await dbConnect()
  const findProduct = await product.find({isDeleted: false}).populate('ingredients.ingredient')
  res.status(200).json({ success: true, data: findProduct })
})

router.post(async (req, res) => {
  await dbConnect()

  const findProduct = await product.create({
    name: req.body?.name,
    price: req.body?.price,
    ingredients: req.body?.ingredients.map(item => { return { ingredient: item.id, quantity: item.quantity } }),
    quantity: req.body?.quantity,
    isDeleted: false
  })
  res.status(200).json({ success: true, data: findProduct })
})

router.put(async (req, res) => {
  try {
    await dbConnect()
    const updateProduct = await product.findByIdAndUpdate(req.query.id, {
      name: req.body?.name,
      price: req.body?.price,
      ingredients: req.body?.ingredients.map(item => { return { ingredient: item.id, quantity: item.quantity } }),
      quantity: req.body?.quantity
    })
    console.log("edit ", updateProduct)
    res.status(200).json({ success: true, data: updateProduct })
  } catch (error) {
    console.log("next error", error)
    res.status(400).json({ error: error })
  }
})

router.delete(async (req, res) => {
  try {
    await dbConnect()
    const deleteStatus = await product.findByIdAndUpdate(req.query.id, { isDeleted: true })
    res.status(200).json({ success: true, data: deleteStatus })
  } catch (error) {
    res.status(400).json({ error: error })
  }
})

export default router.handler();