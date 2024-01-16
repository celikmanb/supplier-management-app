import { createRouter } from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { SignJWT } from "jose";
import user from "../../../models/user";
import { getJwtSecretKey, verifyJwtToken } from "../../../lib/auth";
import CryptoJS from "crypto-js";
import { AES } from "crypto-js";
import role from "../../../models/role";

const router = createRouter()

router.use(async (req, res, next) => {
  const start = Date.now();
  await next(); // call next in chain
  const end = Date.now();
  console.log(`Request took ${end - start}ms`);
})

router.post(async (req, res) => {
  try {
    await dbConnect()
    let temp2 = getJwtSecretKey()
    const decoder = new TextDecoder("utf-8");
    let temp3 = decoder.decode(temp2)
    //hashlenmiş password verify edilmeli
    console.log("body ", req.body);
    console.log("dec pwd ", AES.decrypt(req.body.password, temp3).toString(CryptoJS.enc.Utf8));
    const userData = await user.find({
      username: req.body.username,
      password: AES.decrypt(req.body.password, temp3).toString(CryptoJS.enc.Utf8)
    }).populate("role")
    console.log("user data", userData);
    if (!userData) {
      res.status(404).json({ error: "Not user found." })
    }

    const token = await new SignJWT({
      userId: userData[0]?._id,
      username: userData[0]?.username,
      role: userData[0]?.role?.role_name
    })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('2.5 hrs')
    .sign(getJwtSecretKey());

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`);

    res.status(200).json({success: true, data: token})

  } catch (error) {
    console.log("LOGIN ERR ", error)
    res.status(400).json({error: error})
  }
})

router.put(async (req, res) => {
  try {
    await dbConnect()
    console.log("body ", req.body);
    console.log("query ", req.query);
    if (req?.body?.email != '' && req?.body?.password != '') {
      /* let roleTemp = await role.create({
        role_name: req.body.role 
      }) */

      const newUser = await user.create({
        username: req.body.email,
        password: req.body.password,
        role: req.body.role
      })
      res.status(200).json({success: true, data: newUser})
    }else {
      res.status(400).json({success: false})
    }
  } catch (error) {
    console.log("register error", error)
    res.status(400).json({error: error})
  }
})

router.get(async (req, res) => {
  try {
    const cookie = req.headers.cookie.split("token=")[1]
    console.log("req123 ", cookie);
    let token = await verifyJwtToken(cookie)
    res.status(200).json({success: true, data: token})
  } catch (error) {
    res.status(400).json({error: error})
  }
})

export default router.handler()