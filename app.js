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
// create price list 
app.post('/create-pricing', async (req, res) => {
// "Unlimited Searches;Access to all gpt engine;AnyFeature 3" 
// split by semi colon 
  console.log(req.body.features)
  const prices = await stripe.prices.create({
    product: req.body.product_id,
    unit_amount: req.body.unit_amount,
    lookup_key: 'chat-gpt',
    currency: 'usd',
    metadata: {
      featuresList:req.body.features
    },
    nickname:req.body.description
  });

  res.send({
    publishableKey: Publishable_Key,
    prices: prices,
  });
});
// create price list 
app.post('/update-pricing', async (req, res) => {
  const prices =  await stripe.prices.update(req.body.price_Id, {active: false});

  res.send({
    publishableKey: Publishable_Key,
    prices: prices,
  });
});
// get price list 
app.get('/get-all-pricing', async (req, res) => {
  const prices = await stripe.prices.list({
    // lookup_keys: ['Monthly', 'sample_premium'],
    lookup_keys: ['chat-gpt'],
    expand: ['data.product'],
    active:true
  });

  res.send({
    publishableKey: Publishable_Key,
    prices: prices.data,
  });

});
// Create subscription
app.post("/checkout1", async (req, res) => {
  const { customer_Id, priceId, customeremail } = req.body;
  
  // create customer 
  const customer = await stripe.customers.create({
    email: customeremail,
  });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' }
  );
  // Subscription create 
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    const subscriptionId = subscription.id
    const clientSecret = subscription.latest_invoice.payment_intent.client_secret
    const clientpaymentIntentId = subscription.latest_invoice.payment_intent.id
    const DateData=new Date()
    const EndDate = new Date(DateData.getTime() + 3 * 24 * 60 * 60 * 1000);
    const Transaction = new TransactionModel({
      _id: mongoose.Types.ObjectId(),
      user_Id: customer_Id,
      user_email: customeremail,
      paymentIntent_Secret: clientpaymentIntentId,
      customer_Stripe_Id: customer.id,
      ephemeralKey: ephemeralKey.secret,
      paymentStatus: 'succeeded',
      priceId: priceId,
      subscriptionId: subscriptionId,
      clientSecretSubscription: clientSecret,
      startingdate:DateData.toISOString(),
      freeTrialEndDate:EndDate.toISOString()

    });
    Transaction.save((error, result) => {
      if (error) {
        res.status(200).json({ result: error, error: true, message: "Error Creating Transaction", statusCode: 200 })
      } else {
        res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
        // res.sendStatus(200)
      }
    })
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});
app.post("/get-refund-user-data", async (req, res) => {
  const user_Id = req.body.user_Id;
  TransactionModel.find({ user_Id: user_Id,status:'succeeded'}, function (err, foundResult) {
      try {
          res.status(200).json({ result: foundResult[0], error: false, message: "Get Data Successfully", statusCode: 200 })
      } catch (err) {
          res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
      }
  })
});
app.post("/refund_payment", async (req, res) => {
  const { clientSecret, amount } = req.body;
  stripe.paymentIntents.retrieve(clientSecret)
  .then(async paymentIntent => {
    if(paymentIntent.status==='succeeded'){
      console.log("the payment has been successfully processed and funds have been captured")
      const refund = await stripe.refunds.create({
    payment_intent: clientSecret,
    amount: amount
  });
  res.json(refund)
  TransactionModel.find({ paymentIntent_Secret: clientSecret }, function (err, foundResult) {
    try {
      console.log(foundResult[0]._id)
      const updateData = {
        paymentStatus: 'refund'
      }
      const options = {
        new: true
      }
      TransactionModel.findByIdAndUpdate(foundResult[0]._id, updateData, options, (error, result) => {
        if (error) {
          // res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
          // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
      })
      // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

    } catch (err) {
      // res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    }
  })
    }else if(paymentIntent.status==='requires_payment_method'){
      res.json({message:"the payment intent has failed because the payment method attached to it has been declined"})

    }else if(paymentIntent.status==='requires_confirmation'){
      res.json({message:"the payment intent is ready to be confirmed with a payment method, but has not yet been confirmed"})

    }else if(paymentIntent.status==='processing'){
      res.json({message:" the payment is being processed and not yet complete"})


    }else if(paymentIntent.status==='requires_capture'){
      res.json({message:" the payment has been authorized, but not yet captured"})


    }else if(paymentIntent.status==='canceled'){
      res.json({message:"the payment has been canceled."})

    }
  })
  .catch(error => {
    console.error(error);
  });

});


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