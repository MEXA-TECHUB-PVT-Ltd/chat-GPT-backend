const express = require('express');
const router = express.Router();

//Required api's 
// const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const User = require('./Routes/userRoutes')
const Company = require('./Routes/Company')








/*********Main Api**********/

router.use('/admin',Admin);
router.use('/user',User);
router.use('/company',Company);



























module.exports = router;