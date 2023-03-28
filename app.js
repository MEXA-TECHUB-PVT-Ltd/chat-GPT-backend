const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
var bodyParser = require('body-parser')
const userRoutes = require('./api/api');
const globalErrHandler = require('./utils/errorController');
const AppError = require('./utils/appError');
const TransactionModel = require("./models/TransactionModel");
const mongoose = require("mongoose");
const path = require('path');
var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key
const stripe = require('stripe')(Secret_Key)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

// Set security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use('/uploads', express.static('uploads'))
app.use('/file-uploads', express.static('file-uploads'))
app.use('/video-uploads', express.static('video-uploads'))



//multer

app.use('/upload-image', require('./api/upload-image'))
// Stripe 
app.post("/checkout", async (req, res) => {
  const { customer_Id, cardHolderName, cvv, cardNumber, expiry, amount, customername, customeremail } = req.body;
  console.log('cus here', customer_Id, customername, customeremail, cardHolderName, cvv, cardNumber, expiry, amount, expiry.substring(0, 2))
  const token = await stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: expiry.substring(0, 2),
      exp_year: expiry.substring(3),
      cvc: cvv,
      name: cardHolderName
    },
  });
  console.log("tokens here:", token)
  // Create or retrieve the Stripe Customer object associated with your user.
  //let customer = await stripe.customers.create(); // This example just creates a new Customer every time
  const customer = await stripe.customers.create({
    email: customeremail,
    source: token.id,
    name: customername,
    // address: {
    //  line1: 'TC 9/4 Old MES colony',
    //  postal_code: '110092',
    //  city: 'New Delhi',
    //  state: 'Delhi',
    //  country: 'India',
    // }
  })
  // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' }
  );
  // const { CardName } = req.body;
  // if (!CardName) return res.status(400).json({ message: "Please enter a name" });
  // Create a PaymentIntent with the payment amount, currency, and customer
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    // name:name,
    customer: customer.id,
    payment_method_types: ['card'],
    payment_method: 'pm_card_visa',
    confirm: true,
  });
  console.log('response:', res)
  // Send the object keys to the client
  console.log('payment:', paymentIntent)

  // res.send({
  //   publishableKey: Publishable_Key, // https://stripe.com/docs/keys#obtain-api-keys
  //   paymentIntent: paymentIntent.id,
  //   customer: customer.id,
  //   ephemeralKey: ephemeralKey.secret,
  //   client_secret: paymentIntent.client_secret,
  //   success: true,
  // });
  const Transaction = new TransactionModel({
    _id: mongoose.Types.ObjectId(),
    user_Id: customer_Id,
    user_email: customeremail,
    userName: customername,
    paymentIntent_Secret: paymentIntent.id,
    customer_Stripe_Id: customer.id,
    ephemeralKey: ephemeralKey.secret,
    amount: amount,
    client_secret: paymentIntent.client_secret,
    paymentStatus: 'succeeded'


  });
  Transaction.save((error, result) => {
    if (error) {
      res.status(200).json({ result: error, error: true, message: "Error Creating Transaction", statusCode: 200 })
    } else {
      res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
      // res.sendStatus(200)
    }
  })


});
app.post("/refund_payment", async (req, res) => {
  const { clientSecret, amount } = req.body;
  const refund = await stripe.refunds.create({
    payment_intent: clientSecret,
    amount: amount
  });
  // res.json(refund)
  TransactionModel.find({ paymentIntent_Secret: clientSecret }, function (err, foundResult) {
    try {
      console.log(foundResult[0]._id)
      const updateData = {
      
        paymentStatus:'refund'

    }
    const options = {
        new: true
    }
    TransactionModel.findByIdAndUpdate(foundResult[0]._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
        // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

    } catch (err) {
        res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    }
})
});


// app.get('/admin',function(req,res) {
//   // res.send('../Services/helloWorld.html');
//   res.sendFile(path.join(__dirname+'/helloWorld.html'));
// });
// app.get("/hello", (req, res) => {
//   res.send("hello", { title: "Hey", message: "Hello there!" });
//   // readAndServe("./Services/helloWorld.html",res) 
// });
// app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use('/admin', res.sendFile('./Services/helloWorld.html'))

app.use('/upload-video', require('./api/upload-video'))
app.use('/upload-multiple-images', require('./api/upload-multiple-images'))
app.use('/upload-file', require('./api/upload-file'))
app.use('/upload-multiple-files', require('./api/upload-multiple-files'))
// Limit request from the same API 
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/apis', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
  limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// //swaggerDocument

// Routes
app.get('/', function (req, res) {
  res.send('<h1>Working</h1>')
})
app.use("/api", userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route');
  next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;