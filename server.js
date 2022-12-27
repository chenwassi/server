const express = require('express');
const cors = require('cors');
const app = express();
const productRouter =require('./routes/productRouter')
const storeRouter =require('./routes/storeRouter')
const orderRouter =require('./routes/orderRouter')
const userRouter =require('./routes/userRouter')
const userAuthRouret =require('./routes/userAuthRouret')
const stripe =require('./routes/stripe')
const expressSession = require("express-session");
const passport = require("passport");

require('dotenv').config()
const port = process.env.PORT || 5000

require("./config/authenticateGoogle")(passport)

app.use(
    expressSession({
      secret: "jayantpatilapp",
      resave: true,
      saveUninitialized: true,
    })
  );

// app.use(
//   cookieSession({
//     maxAge:24*60*60*1000,
//     keys:'cookie'
//   })
// )
  app.use(passport.initialize());
  app.use(passport.session());


app.use(cors({origin:"http://localhost:3000",credentials: true,}))
app.use(express.json())


const connect =require('./config/connection');
// app.use(require('./routes/route'))

app.use('/api/products',productRouter)
app.use('/api/stores',storeRouter)
app.use('/api/orders',orderRouter)
app.use('/api/users',userRouter)
app.use('/auth',userAuthRouret)
app.use('/api/stripe',stripe)


connect.then(db =>{
    if(!db)return process.exit(1)
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })
    app.on('error',err => console.log(`Failed To Connect wite HTTP Server:${err}`))
}).catch(error =>{
    console.log(`connection Failed ${error}`);
}) 