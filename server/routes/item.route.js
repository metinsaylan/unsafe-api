const express = require( 'express' );
const ItemController = require('../controllers/item.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;

router.route( '/' )
  .get( ItemController.index )
  .post( asyncHandler( ItemController.insert ) );

router.route( '/:item_id' )
  .get( ItemController.view )
  .patch( ItemController.patch )
  .put( ItemController.update )
  .delete( ItemController.delete );
