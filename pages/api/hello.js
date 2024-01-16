// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../lib/dbConnect' 
import ingriedient from '../../models/ingriedient'
// import product from '../../models/product'

/* const jsdom = require("jsdom");
const { JSDOM } = jsdom; */


export default async function handler(req, res) {

  await dbConnect()

  const users = await ingriedient.find({})
  res.status(200).json({ success: true, data: users })

  /* const dom = new JSDOM(``, {
    url: "https://asurascanstr.com/",
    referrer: "https://asurascanstr.com/",
    includeNodeLocations: true,
    storageQuota: 10000000
  });

  let firstLink = []

  // Get popular manga information

  fetch("https://asurascanstr.com/")
    .then(async response => {
      const texting = await response.text()
      const dom = new JSDOM(texting);
      // const parsed = dom.window.document.getElementsByClassName("listupd").item(0).innerHTML
      dom.window.document.getElementsByClassName("listupd").item(0).querySelectorAll('a').forEach(link => {
        firstLink.push(link.href)
        console.log("DENEME ", link.title);
      });
      // console.log("ADS ", dom.window.document.getElementsByClassName("listupd").item(0).innerHTML);
    })
    .catch(error => {
      console.log(error);
    }); */

    /* fetch("https://asurascanstr.com/manga/kuduz-hancerin-intikami/")
      .then(async response => {
        const texting = await response.text()
        const dom = new JSDOM(texting);
      })
      .catch(error => {
        console.log(error);
      }) */



  // res.status(200).json({ name: dom.window.document.getElementsByClassName("listupd") })
}
