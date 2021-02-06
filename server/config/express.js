
const express = require( 'express' );
const path = require( 'path' );
const httpError = require( 'http-errors' );

const helmet = require( 'helmet' );
const logger = require( 'morgan' );
const compression = require( 'compression' );
const cookieParser = require( 'cookie-parser' );

const config = require( './config' );
const routes = require( '../routes/index.route' );

const app = express();

if( config.env === 'development' ){
  app.use( logger('dev') );
  console.log( 'Morgan is enabled.' );
}

var distDir = '../../dist';
app.use( express.static( path.join( __dirname, distDir ) ) );
app.use( /^((?!(api)).)*/, (req, res) => {
  res.sendFile( path.join( __dirname, distDir, '/index.html' ) );
});

app.use( express.json({limit: '50mb'}) );
app.use( express.urlencoded( { extended: true, limit: '50mb'} ) );

app.use( compression() );
app.use( cookieParser() );
app.use( helmet() );

app.use( '/api/', routes );

app.use( (req, res, next) => {
  const err = new httpError(404);
  return next(err);
} );

// Error handling
app.use( (err, req, res, next) => {

  if (err.isJoi) {
    err.message = err.details.map( e => e.message ).join("; ");
    err.status = 400;
  }

  res.status( err.status || 500 ).json({ status: "error", message: err.message });
  next(err);

});

module.exports = app;