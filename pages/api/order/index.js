import { createRouter } from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import order from '../../../models/order'
import product from '../../../models/product'

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
    
    const findOrder = await order.find({isDeleted: false}).populate("products").populate("place")
    console.log("api order", findOrder)
    res.status(200).json({ success: true, data: findOrder })

  } catch (error) {
    console.log("api error", error)
  }
})

router.post(async (req,res) => {
  try {
    await dbConnect()
    const { products, place, totalCost, totalPrice, orderDate } = req.body;

    console.log("BODY ", req.body)
  
    const findOrder = await order.create({
      products: products,
      place: place,
      totalCost: totalCost,
      totalPrice: totalPrice,
      orderDate: orderDate,
      isDeleted: false
    })
    /* if (findOrder) {
      products.map(async (item) => {
        await product.findByIdAndUpdate(item._id)
      })
    } */

    console.log("order success")
    res.status(200).json({ success: true, data: findOrder })
    
  } catch (error) {
    console.log("order error", error)
  }
})

router.put(async (req, res) => {
  try {
    await dbConnect()
    const updateOrder = await order.findByIdAndUpdate(req.query.id, req.body)
    console.log("edit ", updateOrder)
    res.status(200).json({success: true, data: updateOrder})
  } catch (error) {
    console.log("next error", error)
    res.status(400).json({error: error})
  }
})

router.delete(async (req, res) => {
  try {
    await dbConnect()
    const deleteStatus = await order.findByIdAndUpdate(req.query.id, {isDeleted: true})
    res.status(200).json({success: true, data: deleteStatus})
  } catch (error) {
    res.status(400).json({error: error})
  }
})

export default router.handler();