import mongoose from 'mongoose'

const schema = mongoose.Schema;

const OrderSchema = new schema(
  {
    // Siparişte birden fazla ürün olabilir, bu nedenle bir alt döküman olarak ürünleri içereceğiz
    products: [
      {
        id: {
          type: String,
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: String,
          required: true
        },
        price: {
          type: String,
          required: true
        },
        totalPrice: {
          type: String,
          required: true
        },
        ingredients: {
          type: Array,
        }
      },
    ],
    // Mekan bilgisi
    place: {
      _id: {
        type: String,
      },
      name: {
        type: String,
        required: true
      }
    },
    // Toplam maliyet ve toplam satış fiyatı
    totalCost: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // Sipariş tarihi
    orderDate: {
      type: Date,
      default: Date.now,
    },
    isDeleted: { type: Boolean, defaults: false }
  },
  { timestamps: true }
);

// Sipariş modelini oluşturuyoruz
mongoose.models = {}
let order = mongoose.model('order', OrderSchema);

export default order
//example post request
/* {
  "products": [
    {
      "name": "Brownie",
      "quantity": 2,
      "price": 10
    },
    {
      "name": "Tiramisu",
      "quantity": 3,
      "price": 15
    }
  ],
  "restaurantId": "creed-cafe",
  "totalCost": 65,
  "totalPrice": 100
} */

