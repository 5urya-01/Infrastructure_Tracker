var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var url = "mongodb+srv://InfraStructure:InfraStructure@infrastructure.velo8.mongodb.net/"
var app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');



const loginDetails = require('./routes/loginRouter')
const floorDetails = require('./routes/floorRouter')
const roomDetails = require('./routes/roomRouter')
const hallDetails = require('./routes/hallRouter');
const assetDetails = require('./routes/assetRouter');
const buildingDetails = require('./routes/buildingRouter')
const buildingPlaceWise = require('./routes/buildingPlaceWiseRouter')
const floorPlaceWise = require('./routes/floorPlaceWiseRouter')
const roomPlaceWise = require('./routes/roomPlaceWiseRouter')
const storeroom = require('./routes/storeroomRouter');
const buildingItemWise = require('./routes/buildingItemWiseRouter')



app.use(cors());
mongoose.connect(url)
.then(() => {
  console.log("Connected to DB");
})
.catch((err) => {
  console.error(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginDetails);
app.use('/', floorDetails);
app.use('/', roomDetails);
app.use('/', hallDetails);
app.use('/', assetDetails);
app.use('/', buildingDetails);
app.use('/', buildingPlaceWise);
app.use('/', floorPlaceWise);
app.use('/', roomPlaceWise);
app.use('/', storeroom);
app.use('/', buildingItemWise);
var port = 7000;
app.listen(port,() => {
  console.log("backend is running at " + port);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
