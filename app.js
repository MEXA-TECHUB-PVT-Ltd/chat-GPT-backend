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
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
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
app.get('/', function(req, res){
    res.send('<h1>Working</h1>')
})
app.use("/api" , userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;