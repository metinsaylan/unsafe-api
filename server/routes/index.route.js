const express = require( 'express' );

const itemRoutes = require( './item.route' );

const router = express.Router();

router.get( '/status', (req, res) => res.send('OK') );
router.use( '/item', itemRoutes );

module.exports = router;