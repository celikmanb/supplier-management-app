import { createRouter } from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import place from "../../../models/place";

const router = createRouter()

router.use(async (req, res, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(`Request took ${end - start}ms`);
})

router.delete(async (req, res) => {
  try {
    await dbConnect()
    const deleteStatus = await place.findByIdAndUpdate(req?.query?.id, {isDeleted: true})
    res.status(200).json({success: true, data: deleteStatus})
  } catch (error) {
    res.status(400).json({error: error})
  }
})

router.get(async (req, res) => {
  try {
    await dbConnect()
    const data = await place.find({isDeleted: false})
    res.status(200).json({ success: true, data: data })
  } catch (error) {
    res.status(400).json({error: error})
  }
})

router.post(async (req, res) => {
  try {
    await dbConnect()
    const newPlace = await place.create({
      name: req.body?.name
    })
    res.status(200).json({success: true, data: newPlace})
  } catch (error) {
    console.log("place error ", error)
    res.status(400).json({error: error})
  }
})

router.put(async (req, res) => {
  try {
    await dbConnect()
    const updatePlace = await place.findByIdAndUpdate(req.query.id, req.body)
    console.log("edit ", updatePlace)
    res.status(200).json({success: true, data: updatePlace})
  } catch (error) {
    console.log("next error", error)
    res.status(400).json({error: error})
  }
})



export default router.handler()