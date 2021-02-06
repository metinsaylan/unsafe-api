#!/usr/bin/env node

const config = require( './config/config' );
const app = require( './config/express' );
require( './config/mongoose' );

if ( !module.parent ) {
  app.listen( config.port || 5600, 'localhost', () => {
    console.info( `Server started on port ${config.port} (${config.env})` );
  } );
}

module.exports = app;