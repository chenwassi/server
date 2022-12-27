const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/orderModel");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.cartItem);
  const line_items = req.body.cartItem.map(item=>{
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.img],
          description: item.description,
          metadata:{
            id:item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    }
  })
  const session = await stripe.checkout.sessions.create({

 line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/InStore`,
  });  
  res.send({ url: session.url });


});








module.exports = router;