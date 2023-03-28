const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Subscription_plan = require('./Routes/Subscription_plan')
const Room = require('./Routes/Room')
const MsgRoom = require('./Routes/MsgRoom')
const FAQs = require('./Routes/FAQS')
const AppUpdates = require('./Routes/AppUpdates')
const UserSubscription = require('./Routes/UserSubscription')
const Transaction = require('./Routes/Transactions')
const Privacy_Policy = require('./Routes/Privacy_Policy')
const termsAndCondition = require('./Routes/Terms_and_conditions')

/*********Main Api**********/

router.use('/admin', Admin);
router.use('/user', User);
router.use('/Subscription_plan', Subscription_plan);
router.use('/room', Room);
router.use('/msg_room', MsgRoom);
router.use('/faqs', FAQs);
router.use('/AppUpdates', AppUpdates);
router.use('/UserSubscription', UserSubscription);
router.use('/Privacy_Policy', Privacy_Policy);
router.use('/Transactions', Transaction);
router.use('/Terms_and_conditions', termsAndCondition);

module.exports = router;