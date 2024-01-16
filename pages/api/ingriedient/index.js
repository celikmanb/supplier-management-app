import { createRouter } from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import ingriedient from "../../../models/ingriedient";

const router = createRouter()

router.use(async (req, res, next) => {
  const start = Date.now();
  await next(); // call next in chain
  const end = Date.now();
  console.log(`Request took ${end - start}ms`);
})

router.get(async (req, res) => {
  try {
    await dbConnect()
    const data = await ingriedient.find({isDeleted: false})
    res.status(200).json({ success: true, data: data })
  } catch (error) {
    console.log("ERROR", error)
    res.status(400).json({ error: error })
  }
})

router.post(async (req, res) => {
  try {
    await dbConnect()
    const addIngredient = await ingriedient.create({
      name: req.body?.name,
      unit: req.body?.unit,
      unit_price: req.body?.unit_price,
      quantity: req.body?.quantity
    })
    console.log("add ", addIngredient)
    res.status(200).json({success: true, data: addIngredient})
  } catch (error) {
    console.log("next error", error)
    res.status(400).json({error: error})
  }
})

router.put(async (req, res) => {
  try {
    await dbConnect()
    const updateIngredient = await ingriedient.findByIdAndUpdate(req.query.id, req.body)
    console.log("edit ", updateIngredient)
    res.status(200).json({success: true, data: updateIngredient})
  } catch (error) {
    console.log("next error", error)
    res.status(400).json({error: error})
  }
})

router.delete(async (req, res) => {
  try {
    await dbConnect()
    const deleteStatus = await ingriedient.findByIdAndUpdate(req.query.id, {isDeleted: true})
    res.status(200).json({success: true, data: deleteStatus})
  } catch (error) {
    res.status(400).json({error: error})
  }
})

export default router.handler()