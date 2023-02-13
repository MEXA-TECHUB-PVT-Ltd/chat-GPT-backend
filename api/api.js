const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Company = require('./Routes/Company')
const Subscription_plan = require('./Routes/Subscription_plan')
const Room = require('./Routes/Room')
const MsgRoom = require('./Routes/MsgRoom')
const FAQs = require('./Routes/FAQS')











/*********Main Api**********/

router.use('/admin',Admin);
router.use('/user',User);
router.use('/company',Company);
router.use('/Subscription_plan',Subscription_plan);
router.use('/room',Room);
router.use('/msg_room',MsgRoom);
router.use('/faqs',FAQs);






























module.exports = router;