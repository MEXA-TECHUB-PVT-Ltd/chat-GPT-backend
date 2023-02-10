const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Company = require('./Routes/Company')
const Subscription_plan = require('./Routes/Subscription_plan')









/*********Main Api**********/

router.use('/admin',Admin);
router.use('/user',User);
router.use('/company',Company);
router.use('/Subscription_plan',Subscription_plan);




























module.exports = router;